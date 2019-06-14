import AMQPConnectionFactory from 'network/AMQPConnectionFactory';
import MessageHandlerFactory from 'network/MessageHandlerFactory';

import LoggerFactory from 'LoggerFactory';

import ServerFactory from 'server/ServerFactory';

import config from 'config';

async function main() {
  const queue = new AMQPConnectionFactory(config.get('queue')).create();
  const handler = new MessageHandlerFactory(queue).create();

  const loggerFactory = new LoggerFactory(config.get("logger").level);

  const server = new ServerFactory(config.get("server").port, queue, handler, loggerFactory).create();

  await queue.start();
  await handler.start();
  await server.start();
}

main();
