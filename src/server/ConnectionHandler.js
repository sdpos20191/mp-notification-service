import _ from 'lodash';

class ConnectionHandler {
  constructor(id, client, queue, logger) {
    this.id = id;
    this.client = client;
    this.queue = queue;
    this.logger = logger;
  }

  async start() {
    this.client.on('close', this.onClientClose.bind(this));
    this.client.on('error', this.onClientError.bind(this));
    this.channel = await this.queue.start();
    const { consumerTag } = await this.queue.onQueueMessage('ocorrencias-queue', this.onQueueMessage.bind(this));
    this.consumerTag = consumerTag;
  }

  async onClientClose(code, reason) {
    this.logger.info('Disconnected');
    this.logger.debug(`Disconnect code: ${code}`);
    this.logger.debug(`Disconnect reason: ${reason}`);
    await this.queue.cancelConsume(this.consumerTag);
  }

  onClientError(error) {
    this.logger.error(error.message);
  }

  parseBuffer(buffer) {
    return JSON.parse(buffer.toString('utf-8'));
  }

  onQueueMessage(msg) {
    try {
        const { content, fields } = msg;
        const data = this.parseBuffer(content);
        const { routingKey } = fields;

        this.logger.debug(`Receive message ${routingKey}`);
        this.logger.debug(JSON.stringify(data));

        this.client.send('occurrence', data);
        this.channel.ack(msg);
      } catch (err) {
        this.logger.error(err.stack);
        this.channel.nack(msg);
      }
  }
}

export default ConnectionHandler;
