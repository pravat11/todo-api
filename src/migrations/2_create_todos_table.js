/**
 * Create todos table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('todos', table => {
    table
      .increments('id')
      .primary()
      .unsigned();
    table.specificType('text', 'varchar(500)').notNullable();
    table.specificType('is_active', 'bit').nullable();
    table.specificType('is_completed', 'bit').nullable();
    table
      .specificType('created_at', 'datetimeoffset')
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .specificType('updated_at', 'datetimeoffset')
      .defaultTo(knex.fn.now())
      .notNullable();
  });
}

/**
 * Drop todos table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('todos');
}
