import Joi from 'joi';
import validate from '../utils/validate';

const SEND_MESSAGE_SCHEMA = {
  message: Joi.string()
    .label('message')
    .max(500),
  senderUserId: Joi.number()
    .label('senderUserId')
    .required()
};

export function validateSendMessageRequest(req, res, next) {
  return validate(req.body, SEND_MESSAGE_SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}
