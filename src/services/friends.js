import { knex } from '../db';
import logger from '../utils/logger';
import { toCamelCase } from '../utils/object';

import { getFriendsListQuery } from '../db/queries/get_friends_list';

export async function getFriendsList(userId) {
  logger.log('info', 'Fetching friend lists for user', userId);

  const query = getFriendsListQuery(userId);

  const friendList = await knex.raw(query).then(res => {
    return toCamelCase(res.rows);
  });

  return {
    data: friendList,
    message: 'List of friends'
  };
}
