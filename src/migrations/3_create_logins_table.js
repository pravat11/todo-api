/**
 * Create logins table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('logins', table => {
    table
      .increments('id')
      .primary()
      .unsigned();
    table.specificType('username', 'varchar(50)').notNullable();
    table.specificType('password', 'varchar(50)').nullable();
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
 * Drop logins table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('logins');
}
