/**
 * Create login_sessions table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('login_sessions', table => {
    table
      .increments('id')
      .primary()
      .unsigned();
    table
      .specificType('user_account_id', 'integer')
      .notNullable()
      .references('id')
      .inTable('logins');
    table.specificType('token', 'varchar(100)').notNullable();
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
 * Drop login_sessions table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('login_sessions');
}
