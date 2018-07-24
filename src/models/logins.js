import bookshelf from '../db';

const TABLE_NAME = 'logins';

const Logins = bookshelf.Model.extend({
  tableName: TABLE_NAME
});

export default Logins;
