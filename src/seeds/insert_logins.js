/**
 * Seed logins table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('logins')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('logins').insert({ username: 'admin', password: 'admin' }),
        knex('logins').insert({ username: 'prabhat', password: 'prabhat' }),
        knex('logins').insert({ username: 'nijita', password: 'nijita' })
      ]);
    });
}
