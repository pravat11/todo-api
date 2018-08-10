import { knex } from '../db';
import logger from '../utils/logger';
import { trigger } from '../utils/notifier';
import { toCamelCase } from '../utils/object';
import ChatMessages from '../models/chatMessages';
import { getDeleteChatMessagesQuery } from '../db/queries/delete_chat_messages';

export async function sendMessage(payload) {
  logger.log('info', 'Creating a chat message entry in database');

  const { message, senderUserId, friendshipId } = payload;

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

  logger.log('info', 'Pushing message to pusher');

  await trigger(`chitchat-channel-${friendshipId}`, 'message-sent', payload);

  logger.log('info', 'Message pushed to pusher server');

  return {
    data: {
      message: result.message,
      timestamp: result.createdAt,
      senderUserId: result.senderUserId
    },
    message: 'Sent message successfully'
  };
}

export async function getMessages(friendshipId) {
  logger.log('info', 'Fetching chat messages for friendship', friendshipId);

  const messages = toCamelCase(
    await knex
      .select('message', 'sender_user_id', 'created_at')
      .from('chat_messages')
      .where({ friendship_id: friendshipId })
  );

  return {
    data: messages,
    message: 'List of chat messages'
  };
}
