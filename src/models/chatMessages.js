import bookshelf from '../db';

const TABLE_NAME = 'chat_messages';

const ChatMessages = bookshelf.Model.extend({
  tableName: TABLE_NAME
});

export default ChatMessages;
