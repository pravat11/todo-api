import Boom from 'boom';

import logger from '../utils/logger';
import Logins from '../models/logins';
import { generateToken } from '../utils/string';
import LoginSessions from '../models/loginSessions';

export async function getToken(token) {
  logger.log('info', 'Validating token');

  const activeSession = await LoginSessions.where({ token }).fetch();

  if (!activeSession) {
    throw new Boom.unauthorized(`Invalid token`);
  }

  return activeSession;
}

export async function validateLogin(loginPayload) {
  logger.log('info', 'Validating username and  password');

  const login = await Logins.where(loginPayload).fetch();

  if (!login) {
    throw new Boom.badRequest(`Username or password doesn't exist`);
  }

  const token = generateToken();

  logger.log('info', 'Checking if session is active for user');

  const activeSession = await LoginSessions.where({ user_account_id: login.id }).fetch();

  if (activeSession) {
    logger.log('info', 'Clearing previous session status');

    await new LoginSessions({ id: activeSession.id }).fetch().then(session => session.destroy());
  }

  logger.log('info', 'Creating new session');

  const data = await new LoginSessions({ token, userAccountId: login.id }).save().then(session => session.refresh());

  return {
    data,
    message: 'Login successful'
  };
}
