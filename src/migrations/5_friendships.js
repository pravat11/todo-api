/**
 * Create friendships table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('friendships', table => {
    table
      .increments('id')
      .primary()
      .unsigned();
  });
}

/**
 * Drop friendships table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('friendships');
}
