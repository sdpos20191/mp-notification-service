import Server from 'server/Server';
import ConnectionHandlerFactory from 'server/ConnectionHandlerFactory';

class ServerFactory {
  constructor(port, queue, handler, loggerFactory) {
    this.port = port;
    this.queue = queue;
    this.handler = handler;
    this.loggerFactory = loggerFactory;
  }

  create() {
    const connectionHandlerFactory = new ConnectionHandlerFactory(this.queue, this.handler);

    return new Server(
      this.port,
      connectionHandlerFactory,
      this.loggerFactory.create("Server"),
    );
  }
}

export default ServerFactory;
