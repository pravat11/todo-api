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
    table
      .specificType('user_id_1', 'integer')
      .notNullable()
      .references('id')
      .inTable('logins');
    table
      .specificType('user_id_2', 'integer')
      .notNullable()
      .references('id')
      .inTable('logins');
    table
      .specificType('created_at', 'timestamp')
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .specificType('updated_at', 'timestamp')
      .defaultTo(knex.fn.now())
      .notNullable();
    table.unique(['user_id_1', 'user_id_2']);
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
