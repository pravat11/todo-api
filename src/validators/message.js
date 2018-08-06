import Joi from 'joi';
import validate from '../utils/validate';

const SEND_MESSAGE_SCHEMA = {
  timestamp: Joi.string()
    .label('timestamp')
    .max(500),
  message: Joi.string()
    .label('message')
    .max(500),
  username: Joi.string()
    .label('username')
    .max(100)
};

export function validateSendMessageRequest(req, res, next) {
  return validate(req.body, SEND_MESSAGE_SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}
