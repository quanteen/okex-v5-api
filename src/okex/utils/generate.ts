import path from 'path';
import fs from 'fs';
import { setupProxy } from '../../utils/functions';
import { getParsedContent, Param, Api } from './parser';
import { toHump } from './utils';
import { exec } from 'child_process';

setupProxy();

const getInterface = (params: Param[]) => {
  let result = '{';
  for (const req of params) {
    result += `
      /** ${req.description || ''} */
      ${req.name}${
      !req.required || req.required?.toLowerCase() === 'yes' ? '' : '?'
    }: ${
      // eslint-disable-next-line
      getParamType(req)
    };
    `;
  }
  return result + '}';
};

const getParamType = (param: Param) => {
  if (param?.children?.length) {
    const childInterface = getInterface(param.children);
    if (param.type === 'Object') {
      return childInterface;
    }
    return childInterface + '[]';
  }
  const basicType = param.type.toLowerCase();
  // 兼容 Get Order Book
  if (basicType === 'array') {
    return 'string[]';
  }
  return basicType;
};

const generateInterface = (api: Api, functionName: string) => {
  const parsedFunctionName = functionName.replace(
    functionName[0],
    functionName[0].toUpperCase()
  );
  const requestInterfaceName = api.request?.length
    ? `${parsedFunctionName}Request`
    : '';
  const responseInterfaceName = api.response?.length
    ? `${parsedFunctionName}Response`
    : '';
  let content = '';
  if (requestInterfaceName) {
    content += `
      export interface ${requestInterfaceName} ${getInterface(api.request)};
    `;
  }
  if (responseInterfaceName) {
    content += `
      export interface ${responseInterfaceName} ${getInterface(api.response)};
    `;
  }
  return {
    requestInterfaceName,
    responseInterfaceName,
    interfaceContent: content
  };
};

const main = async () => {
  const parsedConent = await getParsedContent();
  fs.writeFileSync(
    path.join(__dirname, '../api.json'),
    JSON.stringify(parsedConent, null, 2)
  );
  let content = `import {request} from './utils/request'`;
  for (const section of parsedConent) {
    for (const api of section.children) {
      const functionName = toHump(
        toHump(
          `${section.section}_${api.nodeName
            .replace(/\W/g, '_')
            .toLowerCase()
            .replace(/_$/g, '')
            .replace(/\s+/g, '')}`
        )
      );
      const [method, url] = api.url.split(' ');
      const {
        requestInterfaceName,
        responseInterfaceName,
        interfaceContent
      } = generateInterface(api, functionName);
      let paramsContent = '';
      if (requestInterfaceName) {
        paramsContent = `params: ${requestInterfaceName}${
          // 这里可能 body 直接传了一个数组进来
          api.requestExample?.includes('[') ? '[]' : ''
        }`;
      }
      content += interfaceContent;
      content += `
        /** ${api.nodeName}
         * Request Example:
         * ${api.requestExample.replace(/\n/g, '\n* ')}
         * Response Example:
         * ${JSON.stringify(api.exampleResponse?.data || [], null, 2).replace(
           /\n/g,
           '\n* '
         )}
         */
        export const ${functionName} = (${paramsContent}): Promise<
          ${responseInterfaceName} ${
        Array.isArray(api.exampleResponse?.data) ? '[]' : ''
      }
        > => {
          return request({
            url: '${url}',
            method: '${method}',
            ${requestInterfaceName ? 'data: params,' : ''}
            paramsIn: '${
              api.requestExample?.includes('body') ? 'body' : 'query'
            }'
          });
        };
    `;
    }
  }
  const fileName = path.join(__dirname, '../index.ts');
  fs.writeFileSync(fileName, content);
  exec(
    `${path.join(
      __dirname,
      '../../../../node_modules/.bin/eslint'
    )} --fix ${fileName}`,
    (err, output) => {
      if (err) {
        console.log(err);
      }
      console.log(output);
      console.log('Done!');
    }
  );
};

main();
