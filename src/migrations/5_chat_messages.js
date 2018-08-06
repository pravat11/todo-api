/**
 * Create chat_messages table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('chat_messages', table => {
    table
      .increments('id')
      .primary()
      .unsigned();
    table.specificType('message', 'varchar(500)').notNullable();
    table
      .specificType('sender_user_id', 'integer')
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
  });
}

/**
 * Drop chat_messages table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('chat_messages');
}
