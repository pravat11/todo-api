import knexJs from 'knex';
import knexConfig from './knexfile';
import bookshelfJs from 'bookshelf';

/**
 * Database connection.
 */
export const knex = knexJs(knexConfig);
const bookshelf = bookshelfJs(knex);

bookshelf.plugin(['virtuals', 'pagination', 'visibility', 'bookshelf-camelcase', 'bookshelf-cast']);

export default bookshelf;
