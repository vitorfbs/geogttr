import { sendMessage } from "../../../producers/producer";
import { IdentifyLocationsHTTPRequest, IdentifyLocationsServiceMessage } from "../../schemas/request";
import { v4 as uuidv4 } from 'uuid';

export default class IdentifyLocationUsecase {
  constructor() {}

  async execute (identifyLocationsRequest: IdentifyLocationsHTTPRequest) {
    try {
      const identifyLocationsMessage: IdentifyLocationsServiceMessage = {
        messageUUID: uuidv4(),
        title: identifyLocationsRequest.title,
        body: identifyLocationsRequest.body
      }
    
      const response = {
        message: await sendMessage(identifyLocationsMessage)
      }

      return response
    } catch (error) {
      throw new Error(`Error: ${error}`);
      
    }
    
  }
}