import Server from 'server/Server';
import ConnectionHandlerFactory from 'server/ConnectionHandlerFactory';

class ServerFactory {
  constructor(port, queue, loggerFactory) {
    this.port = port;
    this.queue = queue;
    this.loggerFactory = loggerFactory;
  }

  create() {
    const connectionHandlerFactory = new ConnectionHandlerFactory(this.queue, this.loggerFactory);

    return new Server(
      this.port,
      connectionHandlerFactory,
      this.loggerFactory.create("Server"),
    );
  }
}

export default ServerFactory;
