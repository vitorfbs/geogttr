import Joi from 'joi';
import { IdentifyLocationsHTTPRequest } from '../../domain/schemas/request'

export default class ValidateIdentifyLocationsRequest {
  constructor() {}

  validate(identifyLocationsHTTPRequest: IdentifyLocationsHTTPRequest) {
    const IdentifyLocationsHTTPRequestSchema = Joi.object({
      title: Joi.string().required(),
      body: Joi.string().required(),
    });

    const { error, value } = IdentifyLocationsHTTPRequestSchema.validate(identifyLocationsHTTPRequest);

    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    return value;
  }
}