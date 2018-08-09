/**
 * Create user_friendships table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('user_friendships', table => {
    table
      .increments('id')
      .primary()
      .unsigned();
    table
      .specificType('user_id', 'integer')
      .notNullable()
      .references('id')
      .inTable('logins');
    table
      .specificType('friendship_id', 'integer')
      .notNullable()
      .references('id')
      .inTable('friendships');
    table
      .specificType('created_at', 'timestamp')
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .specificType('updated_at', 'timestamp')
      .defaultTo(knex.fn.now())
      .notNullable();
  });
}

/**
 * Drop user_friendships table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('user_friendships');
}
