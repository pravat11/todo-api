import Joi from 'joi';
import Boom from 'boom';
import validate from '../utils/validate';
import { getToken } from '../services/login';

const LOGIN_VALIDATION_SCHEMA = {
  username: Joi.string()
    .label('username')
    .max(50),
  password: Joi.string()
    .label('password')
    .max(50)
};

export function validateLoginRequest(req, res, next) {
  return validate(req.body, LOGIN_VALIDATION_SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

export function authenticate(req, res, next) {
  if (!req.header('token')) {
    throw new Boom.unauthorized(`Access token not present in request header`);
  }

  return getToken(req.header('token'))
    .then(() => next())
    .catch(err => next(err));
}
