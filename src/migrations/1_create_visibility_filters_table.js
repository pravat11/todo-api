/**
 * Create visibility filters table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('visibility_filters', table => {
    table
      .increments('id')
      .primary()
      .unsigned();
    table.specificType('name', 'varchar(50)').notNullable();
    table.specificType('description', 'varchar(100)');
  });
}

/**
 * Drop visibility filters table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('visibility_filters');
}
