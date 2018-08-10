import bookshelf from '../db';

const TABLE_NAME = 'friendships';

const Friendships = bookshelf.Model.extend({
  tableName: TABLE_NAME
});

export default Friendships;
