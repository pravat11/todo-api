import bookshelf from '../db';

const TABLE_NAME = 'login_sessions';

const LoginSessions = bookshelf.Model.extend({
  tableName: TABLE_NAME,
  casts: {
    isActive: 'boolean'
  }
});

export default LoginSessions;
