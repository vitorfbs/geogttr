import { v4 as uuidv4 } from 'uuid';
import RabbitMQProducer from "../../drivers/rabbitmq/rabbitmq-producer";
import { IdentifyLocationsServiceMessageSchema } from '../../schemas/request';

export default class IdentifyLocationUsecase {
  rabbitMQProducer: RabbitMQProducer
  
  constructor() {
    this.rabbitMQProducer = new RabbitMQProducer('identify.locations.request')
  }

  async execute (identifyLocationsRequest: IdentifyLocationsServiceMessageSchema) {
    try {
      const identifyLocationsMessage = {
        messageUUID: uuidv4(),
        title: identifyLocationsRequest.title,
        body: identifyLocationsRequest.body
      }
    
      await this.rabbitMQProducer.connect();
      await this.rabbitMQProducer.sendMessage(identifyLocationsMessage);
      await this.rabbitMQProducer.closeConnection();
      
      const response = {
        message: identifyLocationsMessage
      }

      return response
    } catch (error) {
      throw new Error(`Error: ${error}`);
      
    }
    
  }
}