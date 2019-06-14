import shortid from 'shortid';

import Client from 'network/Client';
import ConnectionHandler from 'server/ConnectionHandler';

class ConnectionHandlerFactory {
  constructor(queue, handler) {
    this.queue = queue;
    this.handler = handler;
  }

  create(socket) {
    const client = new Client(socket);
    const id = shortid.generate();

    return new ConnectionHandler(
      id,
      client,
      this.handler,
    );
  }
}

export default ConnectionHandlerFactory;
