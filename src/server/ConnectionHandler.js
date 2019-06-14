import _ from 'lodash';

class ConnectionHandler {
  constructor(id, client, handler) {
    this.id = id;
    this.client = client;
    this.handler = handler;
  }

  async start() {
    this.handler.setOccurrenceListener('occurrence', this.onOccurrenceMessage.bind(this));
    // this.client.on('message', this.onClientMessage.bind(this));
    this.client.on('close', this.onClientClose.bind(this));
    this.client.on('error', this.onClientError.bind(this));
    setInterval(this.onOccurrenceMessage.bind(this), 3000, "oi");
  }

  getHandler(type) {
    if (!this.handlers[type]) {
      throw new Error(`Unknown event type '${type}'`);
    }
    return this.handlers[type];
  }

  onClientClose(code, reason) {
    console.error(code, reason)
    // this.cloud.close();
  }

  onClientError(error) {
    console.error(error);
  }

  onOccurrenceMessage(message) {
    console.log(`Forwarding message ${message} to WS client...`);
    // this.logger.info(`Forwarding '${event.type}' sent by '${event.data.from}'`);
    const date = new Date();
    const data = {
        timestamp: date.getDate(),
        lat: '478.234',
        lng: '7895.435'
    }
    this.client.send('occurrence', data);
  }
}

export default ConnectionHandler;
