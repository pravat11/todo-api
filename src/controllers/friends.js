import * as friendsService from '../services/friends';

export function getFriends(req, res, next) {
  const { userId } = req.params;

  friendsService
    .getFriendsList(userId)
    .then(data => res.json(data))
    .catch(err => next(err));
}
