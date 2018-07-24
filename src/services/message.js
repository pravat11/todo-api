import logger from '../utils/logger';
import { trigger } from '../utils/notifier';

export async function sendMessage(payload) {
  logger.log('debug', 'Pushing message to pusher');
  await trigger('chitchat-channel', 'message-sent', payload);
  logger.log('debug', 'Message pushed to pusher server');
}
