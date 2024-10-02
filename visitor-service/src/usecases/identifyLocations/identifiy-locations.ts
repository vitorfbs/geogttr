import { v4 as uuidv4 } from 'uuid';
import RabbitMQProducer from "../../drivers/rabbitmq/rabbitmq-producer";
import { IdentifyLocationsData, IdentifyLocationsMessageData } from '../../interfaces/usecases';
import Usecase from '../usecase';

export default class IdentifyLocationUsecase implements Usecase{
  rabbitMQProducer: RabbitMQProducer
  
  constructor() {
    this.rabbitMQProducer = new RabbitMQProducer('identify.locations.request')
  }

  async execute (data: IdentifyLocationsData) {
    try {
      const identifyLocationsMessage: IdentifyLocationsMessageData = {
        messageUUID: uuidv4(),
        title: data.title,
        body: data.body
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