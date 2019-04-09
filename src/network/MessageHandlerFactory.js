import MessageHandler from 'network/MessageHandler';

class MessageHandlerFactory {
  constructor(queue) {
    this.queue = queue;
  }

  create() {
    return new MessageHandler(this.queue);
  }
}

export default MessageHandlerFactory;