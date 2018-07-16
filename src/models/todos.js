import bookshelf from '../db';

const TABLE_NAME = 'todos';

const Todos = bookshelf.Model.extend({
  tableName: TABLE_NAME
});

export default Todos;
