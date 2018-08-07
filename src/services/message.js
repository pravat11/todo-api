import { knex } from '../db';
import logger from '../utils/logger';
import { trigger } from '../utils/notifier';
import ChatMessages from '../models/chatMessages';

export async function sendMessage(payload) {
  logger.log('info', 'Creating a chat message entry in database');

  const result = (await new ChatMessages({ message: payload.message, senderUserId: payload.senderUserId })
    .save()
    .then(chatMessage => chatMessage.refresh())).toJSON();

  logger.log('info', 'Chat message entry created in database', result);

  await new ChatMessages().count('id').then(async count => {
    if (count >= 15) {
      const rawSql = `
          DELETE FROM chat_messages
            WHERE id IN (
              SELECT
                id
                FROM chat_messages
                ORDER BY(id)
                ASC
                LIMIT 5
            )`;

      await knex.raw(rawSql).then(res => res);

      logger.log('info', 'Removed old messages');
    }
  });

  logger.log('info', 'Pushing message to pusher');

  await trigger('chitchat-channel', 'message-sent', payload);

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
