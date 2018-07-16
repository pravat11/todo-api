import Joi from 'joi';
import validate from '../utils/validate';

const CREATE_TODO_SCHEMA = {
  text: Joi.string()
    .label('text')
    .max(500)
};

const UPDATE_TODO_SCHEMA = {
  text: Joi.string()
    .label('text')
    .max(500)
    .optional(),
  isCompleted: Joi.boolean()
    .label('isCompleted')
    .optional()
};

/**
 * Validate create todo request.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @return {Promise}
 */
export function validateCreateTodoRequest(req, res, next) {
  return validate(req.body, CREATE_TODO_SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate update todo request.
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @return {Promise}
 */
export function validateUpdateTodoRequest(req, res, next) {
  return validate(req.body, UPDATE_TODO_SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}
