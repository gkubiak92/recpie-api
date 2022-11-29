import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required().default(5432),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow(null, ''),
  PORT: Joi.number().default(3000),
});
