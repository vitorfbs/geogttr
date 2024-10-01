import amqp from 'amqplib'

export default class RabbitMQProducer {
  private queueName: string
  private connection: amqp.Connection | null = null
  private channel: amqp.Channel | null = null

  constructor(queueName: string) {
    this.queueName = queueName
  }

  async connect() {
    try {
      this.connection = await amqp.connect("amqp://guest:guest@localhost/")
      this.channel = await this.connection.createChannel()
      await this.channel.assertQueue(this.queueName, { durable: true })
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error)
      throw new Error('RabbitMQ connection failed')
    }
  }

  async sendMessage(message: any) {
    if (!this.channel) {
      throw new Error('Channel is not available. Call connect() first.')
    }

    try {
      const messageBuffer = Buffer.from(JSON.stringify(message));
      this.channel.sendToQueue(this.queueName, messageBuffer, { persistent: true })
      console.log(`Message sent to ${this.queueName}:`, message)
    } catch (error) {
      console.error('Error sending message:', error)
      throw new Error('Failed to send message')
    }
  }

  async closeConnection() {
    if (this.channel) {
      await this.channel.close()
    }
    if (this.connection) {
      await this.connection.close()
    }
  }
}
