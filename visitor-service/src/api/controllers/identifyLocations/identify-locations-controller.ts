import { Request, Response } from "express";
import { IdentifyLocationsHTTPRequest, IdentifyLocationsHTTPResponse } from '../../../domain/schemas/request';
import IdentifyLocationUsecase from '../../../domain/usecases/identifyLocations/identifiy-locations-usecase';
import ValidateIdentifyLocationsRequest from "../../../validators/http/identify-locations-request";

export default class IdentifyLocationsController {
  identifyLocationUsecase: IdentifyLocationUsecase
  validateIdentifyLocationsRequest: ValidateIdentifyLocationsRequest

  constructor(identifyLocationUsecase: IdentifyLocationUsecase) {
    this.identifyLocationUsecase = identifyLocationUsecase
    this.validateIdentifyLocationsRequest = new ValidateIdentifyLocationsRequest()
  }
  async execute (req: Request, res: Response) {
    try {
      const identifyLocationsHTTPRequest: IdentifyLocationsHTTPRequest = {
        title: req.body.title,
        body: req.body.body
      }

      this.validateIdentifyLocationsRequest.validate(identifyLocationsHTTPRequest);

      const response =  await this.identifyLocationUsecase.execute(identifyLocationsHTTPRequest)

      const identifyLocationsHTTPResponse: IdentifyLocationsHTTPResponse = {
        messageUUID: response.message.messageUUID,
        title: response.message.title,
        body: response.message.body
      }
      
      return {
        code: 202,
        message: 'The request has been sent for identification and will be available shortly',
        response: identifyLocationsHTTPResponse
      }
    } catch (error) {
      return {
        code: 500,
        message: "INTERNAL SERVER ERROR"
      }
    }
    
  }
}