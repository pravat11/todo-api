import * as todoService from '../services/todo';

export function getTodos(req, res, next) {
  todoService
    .getAllTodos()
    .then(data => res.json(data))
    .catch(err => next(err));
}

export function getTodo(req, res, next) {
  todoService
    .getTodo(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err));
}

export function addTodo(req, res, next) {
  todoService
    .createTodo(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
}

export function updateTodo(req, res, next) {
  todoService
    .updateTodo(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
}

export function removeTodo(req, res, next) {
  todoService
    .deleteTodo(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err));
}
