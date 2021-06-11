import Log4js from 'log4js';
import 'global-agent/bootstrap';

export const setupProxy = () => {
  const proxy =
    process.env.http_proxy ||
    process.env.HTTP_PROXY ||
    process.env.HTTPS_PROXY ||
    process.env.https_proxy;

  // eslint-disable-next-line
  // @ts-ignore
  global.GLOBAL_AGENT.HTTP_PROXY = proxy;
  // eslint-disable-next-line
  // @ts-ignore
  global.GLOBAL_AGENT.HTTPS_PROXY = proxy;
};

const debugLogger = Log4js.getLogger();

debugLogger.level = 'debug';

export const debug = debugLogger.debug.bind(debugLogger);
