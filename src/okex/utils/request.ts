import CryptoJS from 'crypto-js';
import got, { Method } from 'got';
import HttpsProxyAgent from 'https-proxy-agent';
import { isEmpty } from 'lodash';
import qs from 'querystring';
import urlJoin from 'url-join';
import { debug } from '../../utils/functions';

type BaseObj = Record<string, any>;

interface RequestConfig {
  url: string;
  method: Method;
  data?: BaseObj | BaseObj[];
  paramsIn: 'query' | 'body';
}

export const config = {
  simulated: true,
  baseUrl: 'https://www.okex.com',
  timeout: 10 * 1000,
  socketUrl: {
    private: 'wss://wspap.okex.com:8443/ws/v5/private?brokerId=9999',
    public: 'wss://wspap.okex.com:8443/ws/v5/public?brokerId=9999'
  }
};

const { apiKey, apiSecret, passphrase } = process.env;

if (!apiKey || !apiSecret || !passphrase) {
  throw new Error('invalid API key or secret');
}

export const socketsProxy = process.env.all_proxy || process.env.ALL_PROXY;

export const socketAgent = socketsProxy
  ? new HttpsProxyAgent(socketsProxy)
  : undefined;

export const setRequestConfig = (requestConfig: Partial<RequestConfig>) => {
  Object.assign(config, requestConfig);
};

export const makeSign = (
  method: Method,
  path: string,
  secret: string,
  body?: BaseObj
) => {
  const bodyStr = isEmpty(body) ? '' : JSON.stringify(body);
  const timestamp =
    path === '/users/self/verify' && method === 'GET'
      ? '' + Date.now() / 1000
      : new Date().toISOString();
  const sign = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(timestamp + method + path + bodyStr, secret)
  );

  debug('sign info', {
    method,
    path,
    body,
    bodyStr,
    timestamp
  });
  return {
    sign,
    timestamp
  };
};

interface MakeHeaderOptions {
  apiKey: string;
  apiSecret: string;
  passphrase: string;
  method: Method;
  path: string;
  body?: BaseObj;
  simulated?: boolean;
}

export const makeHeader = ({
  apiKey,
  apiSecret,
  passphrase,
  method,
  path,
  body,
  simulated
}: MakeHeaderOptions) => {
  const { sign, timestamp } = makeSign(method, path, apiSecret, body);
  const header = {
    'Content-Type': 'application/json',
    'OK-ACCESS-KEY': apiKey,
    'OK-ACCESS-SIGN': sign,
    'OK-ACCESS-PASSPHRASE': passphrase,
    'OK-ACCESS-TIMESTAMP': timestamp
  };
  if (simulated) {
    return {
      ...header,
      'x-simulated-trading': '1'
    };
  }
  return header;
};

export const request = async ({
  url,
  method,
  data = {},
  paramsIn
}: RequestConfig): Promise<any> => {
  const isInBody = paramsIn === 'body';
  const pathWithParams = `${url}${isEmpty(data) ? '' : '?'}${
    isInBody ? '' : qs.stringify(data)
  }`;
  const fullUrl = urlJoin(config.baseUrl, pathWithParams);
  const headers = makeHeader({
    apiKey,
    apiSecret,
    passphrase,
    method,
    path: pathWithParams,
    body: isInBody ? data : null,
    simulated: config.simulated
  });

  debug(`${method}: ${fullUrl}, params: `, data);
  const result: any = await got(fullUrl, {
    method,
    body: isInBody ? JSON.stringify(data) : undefined,
    headers
  }).json();
  const { code = '-1' } = result || {};
  debug(`response code: ${code} ${code ? 'successed' : 'failed'}`);
  if (code === '0' && data) {
    return result.data;
  }
  return result;
};
