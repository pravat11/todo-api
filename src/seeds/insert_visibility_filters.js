/**
 * Seed visibility_filters table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('visibility_filters')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('visibility_filters').insert({ name: 'active', description: 'Active todos' }),
        knex('visibility_filters').insert({ name: 'completed', description: 'Completed todos' }),
        knex('visibility_filters').insert({ name: 'all', description: 'All todos' })
      ]);
    });
}
