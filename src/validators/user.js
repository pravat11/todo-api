import { getUser } from '../services/login';

export function validateUser(req, res, next) {
  return getUser(req.params.userId)
    .then(() => next())
    .catch(err => next(err));
}
