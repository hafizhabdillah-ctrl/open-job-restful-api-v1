import Joi from 'joi';
/* eslint-disable camelcase */

export const applicationPayloadSchema = Joi.object({
  user_id: Joi.string().required(),
  job_id: Joi.string().required(),
});

export const applicationUpdatePayloadSchema = Joi.object({
  status: Joi.string().required()
});