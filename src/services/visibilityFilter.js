import VisibilityFilters from '../models/visibilityFilter';

/**
 * Get all visibility filters.
 *
 * @return {Promise}
 */
export async function getAllVisibilityFilters() {
  const visibilityFilters = await VisibilityFilters.fetchAll();

  return {
    data: visibilityFilters,
    message: 'All visibility filters'
  };
}
