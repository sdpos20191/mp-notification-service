import shortid from 'shortid';

import Client from 'network/Client';
import ConnectionHandler from 'server/ConnectionHandler';

class ConnectionHandlerFactory {
  constructor(queue, loggerFactory) {
    this.queue = queue;
    this.loggerFactory = loggerFactory;
  }

  create(socket) {
    const client = new Client(socket);
    const id = shortid.generate();

    return new ConnectionHandler(
      id,
      client,
      this.queue,
      this.loggerFactory.create('ConnectionHandler'),
    );
  }
}

export default ConnectionHandlerFactory;
