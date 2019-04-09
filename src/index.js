import AMQPConnectionFactory from 'network/AMQPConnectionFactory';
import MessageHandlerFactory from 'network/MessageHandlerFactory';
import config from 'config';

async function main() {
  const queue = new AMQPConnectionFactory(config.get('queue')).create();
  const handler = new MessageHandlerFactory(queue).create();

  await queue.start();
  await handler.start();
}

main();
