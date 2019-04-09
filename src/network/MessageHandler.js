import _ from 'lodash';

function printMessage(data) {
  console.log(data);
}

class MessageHandler {
  constructor(queue) {
    this.queue = queue;
    this.handlers = {
      '#': printMessage
    };
  }

  parseBuffer(buffer) {
    return JSON.parse(buffer.toString('utf-8'));
  }

  getHandler(type, key) {
    if (!this.handlers[type][key]) {
      throw new Error(`Unknown event type ${type}.${key}`);
    }
    return this.handlers[type][key].method;
  }

  async handleMessage(msg) {
    const { content, fields } = msg;
    const data = this.parseBuffer(content);
    const { exchange, routingKey } = fields;
    const handler = this.getHandler(exchange, routingKey);

    logger.debug(`Receive message ${exchange}.${routingKey}`);
    logger.debug(JSON.stringify(data));
    try {
      await handler(data);
      this.channel.ack(msg);
    } catch (err) {
      logger.error(err.stack);
      this.channel.nack(msg);
    }
  }

  async listenToQueueMessages(type) {
    await this.queue.onMessage('#', '#', this.handleMessage.bind(this));
  }

  async start() {
    this.channel = await this.queue.start();

    _.keys(this.handlers).forEach(async (key) => {
      await this.listenToQueueMessages(key);
    });
  }
}

export default MessageHandler;