import * as loginService from '../services/login';

export function validateLogin(req, res, next) {
  loginService
    .validateLogin(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
}
