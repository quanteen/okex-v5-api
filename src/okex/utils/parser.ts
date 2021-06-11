import fs from 'fs';
import got from 'got';
import * as cheerio from 'cheerio';
import { setupProxy } from '../../utils/functions';

setupProxy();

const cacheFile = '/tmp/okex.html';

export interface Param {
  name: string;
  type: string;
  description: string;
  required: string;
  children: Param[];
}

export interface Api {
  nodeName: string;
  description: string[];
  request: Param[];
  response: Param[];
  url: string;
  requestExample?: string;
  exampleResponse?: Record<string, any>;
}

export interface Section {
  section: string;
  children: Api[];
  description: string[];
}

// 获取 okex 文档
export const fetchHtml = async (url = 'https://www.okex.com/docs-v5/en/') => {
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile).toString();
  }
  const res = await got(url, {
    timeout: 5 * 1000
  });
  fs.writeFileSync(cacheFile, res.body);
  return res.body;
};

// 获取rest-api部分文档
export const getDomContent = async (startId: string, endId: string) => {
  const html = await fetchHtml();
  const $ = cheerio.load(html);
  let node = $(`.page-wrapper .content #${startId}`);
  const sections: Section[] = [];
  while (node.attr('id') !== endId) {
    const tagName = node.prop('tagName');
    const content = node.text();
    const currentSection = sections[sections.length - 1];
    const currentApi =
      currentSection?.children[currentSection.children.length - 1];
    switch (tagName) {
      case 'H2':
        sections.push({
          section: node.text().replace(' ', ''),
          children: [],
          description: []
        });
        break;
      case 'H3':
        currentSection.children.push({
          nodeName: node.text(),
          description: [],
          request: [],
          response: [],
          url: ''
        });
        break;
      case 'P':
        if (!currentApi) {
          currentSection.description.push(content);
          break;
        }
        if (node.find('code').length) {
          currentApi.url = content;
          break;
        }
        currentApi.description.push(content);
        break;
      case 'H4':
        if (content.includes('Rate Limit')) {
          currentApi.description.push(content);
          break;
        }
        break;
      case 'DIV':
        if (node.find('.plaintext code').length) {
          currentApi.requestExample = content;
          break;
        }
        if (node.find('.json code').length) {
          currentApi.exampleResponse = new Function(
            `return ${content.replace(/\n[.\s]+\n/, '')}`
          )();
          break;
        }
        break;
      case 'TABLE': {
        const cols = node.find('th').length;
        const key = cols === 3 ? 'response' : 'request';
        let name, type, required, description;
        if (![3, 4].includes(cols)) {
          // unrecognized column
          break;
        }
        // multiple table in one api
        if (currentApi[key]?.length) {
          break;
        }
        node.find('tbody>tr').each(function() {
          const values = Array.from(
            $(this)
              .find('td')
              .map(function() {
                return $(this).text();
              })
          );
          if (key === 'request') {
            [name, type, required, description] = values;
          } else {
            [name, type, description] = values;
          }
          if (name.startsWith('>')) {
            const current = currentApi[key][currentApi[key].length - 1];
            if (
              !current.children.find(c => c.name === name.replace(/[>\s]/g, ''))
            ) {
              current.children.push({
                name: name.replace(/[>\s]/g, ''),
                type,
                required,
                description,
                children: []
              });
            }
          } else {
            if (!currentApi[key].find(c => c.name === name)) {
              currentApi[key].push({
                name,
                type,
                required,
                description,
                children: []
              });
            }
          }
        });
      }
    }
    node = node.next();
  }
  return sections;
};

export const getParsedContent = async () => {
  const nodes = await getDomContent('rest-api-account', 'rest-api-status');
  return nodes;
};
