import Pusher from 'pusher';

import logger from './logger';
import config from '../config';

let notifier;

export function init() {
  const { key, appId, secret, cluster } = config.pusher;
  const isConfigSet = key && appId && secret && cluster;

  if (isConfigSet) {
    logger.log('info', 'Initializing pusher');

    notifier = new Pusher({ key, appId, secret, cluster });

    logger.log('info', 'Initialized pusher successfully');
  }

  return notifier;
}

export function get() {
  return notifier;
}

export function trigger(channelName, eventName, payload) {
  notifier.trigger(channelName, eventName, payload);
}
