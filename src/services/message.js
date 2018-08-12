import { knex } from '../db';
import logger from '../utils/logger';
import Logins from '../models/logins';
import { trigger } from '../utils/notifier';
import { toCamelCase } from '../utils/object';
import ChatMessages from '../models/chatMessages';
import { getDeleteChatMessagesQuery } from '../db/queries/delete_chat_messages';

export async function sendMessage(payload) {
  logger.log('info', 'Creating a chat message entry in database');

  const { message, senderUserId, friendshipId, timestamp } = payload;

  const result = (await new ChatMessages({ message, senderUserId, friendshipId })
    .save()
    .then(chatMessage => chatMessage.refresh())).toJSON();

  logger.log('info', 'Chat message entry created in database', result);

  await new ChatMessages()
    .where({ friendship_id: friendshipId })
    .count('id')
    .then(async count => {
      if (count >= 15) {
        const query = getDeleteChatMessagesQuery(friendshipId);

        await knex.raw(query).then(res => res);

        logger.log('info', 'Removed old messages');
      }
    });

  const username = (await Logins.where({ id: senderUserId }).fetch({ columns: ['username'] })).toJSON();

  logger.log('info', 'Pushing message to pusher');

  await trigger(`chitchat-channel-${friendshipId}`, 'message-sent', { message, timestamp, username });

  logger.log('info', 'Message pushed to pusher server');

  return {
    data: {
      username,
      message: result.message,
      timestamp: payload.timestamp
    },
    message: 'Sent message successfully'
  };
}

export async function getMessages(friendshipId) {
  logger.log('info', 'Fetching chat messages for friendship', friendshipId);

  const messages = toCamelCase(
    await knex
      .select('cm.message', 'l.username', 'cm.created_at as timestamp')
      .from('chat_messages as cm')
      .innerJoin('logins as l', 'l.id', 'cm.sender_user_id')
      .where({ friendship_id: friendshipId })
  );

  const data = messages.map(message => {
    message.status = 2;

    return message;
  });

  return {
    data,
    message: 'List of chat messages'
  };
}
