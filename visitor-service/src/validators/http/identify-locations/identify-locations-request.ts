import Joi from 'joi';

 const identifyLocationsHTTPRequestSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

export default identifyLocationsHTTPRequestSchema