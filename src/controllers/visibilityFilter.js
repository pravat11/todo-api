import * as visibilityFilterService from '../services/visibilityFilter';

export function getVisibilityFilters(req, res, next) {
  visibilityFilterService
    .getAllVisibilityFilters()
    .then(data => res.json(data))
    .catch(err => next(err));
}
