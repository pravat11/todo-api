import * as messageService from '../services/message';

export function sendMessage(req, res, next) {
  messageService
    .sendMessage(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
}

export function getAllMessages(req, res, next) {
  const { friendshipId } = req.params;

  messageService
    .getMessages(friendshipId)
    .then(data => res.json(data))
    .catch(err => next(err));
}
