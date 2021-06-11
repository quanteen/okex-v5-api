import { EventEmitter } from 'events';
import Websocket from 'ws';
import { config, socketAgent, makeSign } from './request';
import { debug } from '../../utils/functions';

export type KeyMap = 'public' | 'private';

export class Socket extends EventEmitter {
  private socket: Websocket;
  private key: KeyMap;
  private lastPingTime: number;

  opened = false;
  authed = false;
  removed = false;

  constructor(key: KeyMap) {
    super();
    this.key = key;
    this.parseSocket();
  }

  private parseSocket = () => {
    const url = config.socketUrl[this.key];
    const socket = new Websocket(url, {
      handshakeTimeout: config.timeout,
      agent: socketAgent
    });
    this.socket = socket;
    this.handleSocket();
  };

  private handleSocket = () => {
    const socket = this.socket;
    socket
      .on('ping', () => {
        socket.pong();
      })
      .on('open', () => {
        this.opened = true;
        if (this.key === 'private') {
          const { apiKey, apiSecret, passphrase } = process.env;
          const { timestamp, sign } = makeSign(
            'GET',
            '/users/self/verify',
            apiSecret
          );
          this.send('login', [
            {
              apiKey: apiKey,
              passphrase: passphrase,
              timestamp,
              sign
            }
          ]);
        }
      })
      .on('error', () => {
        this.socket.close();
        this.socket.terminate();
      })
      .on('close', () => {
        if (this.removed) {
          return;
        }
        this.parseSocket();
      })
      .on('message', (msg: string) => {
        this.handleSocketMsg(JSON.parse(msg));
      });
  };

  private handleSocketMsg = (msg: any) => {
    if (msg.event === 'login' && msg.code === '0') {
      debug('login successed');
      this.authed = true;
    }
  };

  send = (op: string, args: any[]) => {
    this.socket.send(
      JSON.stringify({
        op,
        args
      })
    );
  };

  init = async () => {
    const startTime = Date.now();
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (Date.now() - config.timeout > startTime) {
          reject(new Error('Error: Timed out'));
          clearInterval(interval);
        }
        if (!this.opened) {
          return;
        }
        if (this.authed) {
          resolve();
        }
        resolve();
        clearInterval(interval);
      }, 500);
    }).then(() => {
      setInterval(() => {
        this.socket.ping();
        this.lastPingTime = Date.now();
      }, 10 * 1000);
    });
  };

  delete = () => {
    this.removed = true;
    this.socket.close();
    this.socket.terminate();
  };
}
