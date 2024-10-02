export class RabbitMQConnectionFailedError extends Error {
  constructor(error: any) {
      super(`Failed while trying to connnect to RabbitMQ: ${error}`)
      this.name = 'RabbitMQConnectionFailedError'
  }
}

export class RabbitMQChannelNotAvailableError extends Error {
  constructor() {
    super('Channel not available')
    this.name = 'RabbitMQChannelNotAvailableError'
  }
}

export class RabbitMQMessageNotSentError extends Error {
  constructor(error: any) {
    super(`Message not sent: ${error}`)
    this.name = 'RabbitMQMessageNotSentError'
  }
}