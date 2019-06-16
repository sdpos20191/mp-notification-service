import AMQPConnectionFactory from 'network/AMQPConnectionFactory';
import LoggerFactory from 'LoggerFactory';

import ServerFactory from 'server/ServerFactory';

import config from 'config';

async function main() {
  const queue = new AMQPConnectionFactory(config.get('queue')).create();
  const loggerFactory = new LoggerFactory(config.get("logger").level);
  const server = new ServerFactory(config.get("server").port, queue, loggerFactory).create();
  await server.start();
}

main();
