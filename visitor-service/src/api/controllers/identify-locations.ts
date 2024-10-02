import { Request, Response } from "express"
import IdentifyLocationUsecase from '../../usecases/identifyLocations/identifiy-locations';
import identifyLocationsHTTPRequestSchema from "../../validators/http/identify-locations/identify-locations-request";
import { Controller } from "./controller";
import { HttpResponse, accepted, badRequest, internalServerError } from "../protocols/http";
import Usecase from "../../usecases/usecase";

export default class IdentifyLocationsController implements Controller {
  identifyLocationUsecase: Usecase

  constructor(identifyLocationUsecase: IdentifyLocationUsecase) {
    this.identifyLocationUsecase = identifyLocationUsecase
  }

  async handle (req: Request, res: Response): Promise<HttpResponse> {
    try {
      const body = req.body

      const { error } = identifyLocationsHTTPRequestSchema.validate(body);

      if (error) {
        return badRequest(error)
      }

      const result =  await this.identifyLocationUsecase.execute(body)

      return accepted(result.message)
    } catch (error) {
      return internalServerError()
    }
  }
}