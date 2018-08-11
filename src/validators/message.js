import Joi from 'joi';
import validate from '../utils/validate';

const SEND_MESSAGE_SCHEMA = {
  message: Joi.string()
    .label('message')
    .max(500)
    .required(),
  senderUserId: Joi.number()
    .label('senderUserId')
    .required(),
  friendshipId: Joi.number()
    .label('friendshipId')
    .required(),
  timestamp: Joi.string()
    .label('timestamp')
    .max(200)
    .required()
};

export function validateSendMessageRequest(req, res, next) {
  return validate(req.body, SEND_MESSAGE_SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}
