import { AccountGetBalance } from './okex';
import { setupProxy } from './utils/functions';
import { Socket } from './okex/utils/socket';

setupProxy();

const testApi = async () => {
  const res = await AccountGetBalance({
    ccy: 'BTC,ETH'
  });

  console.log(res[0].details[0].ccy);
  console.log(JSON.stringify(res, null, 2));
};

testApi();

const testSocket = async () => {
  const socket = new Socket('private');
  await socket.init();
};

testSocket();
