import { Router } from 'express';

import * as todoValidators from './validators/todo';
import * as loginValidators from './validators/login';
import * as loginController from './controllers/login';
import * as todosController from './controllers/todos';
import * as messageValidators from './validators/message';
import * as messageController from './controllers/message';
import * as visibilityFilterController from './controllers/visibilityFilter';

/**
 * Contains all API routes for the application.
 */
let router = Router();

router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.get('/todo/:id', loginValidators.authenticate, todosController.getTodo);

router.get('/todos', loginValidators.authenticate, todosController.getTodos);

router.post('/todo', loginValidators.authenticate, todoValidators.validateCreateTodoRequest, todosController.addTodo);

router.put(
  '/todo/:id',
  loginValidators.authenticate,
  todoValidators.validateUpdateTodoRequest,
  todosController.updateTodo
);

router.delete('/todo/:id', loginValidators.authenticate, todosController.removeTodo);

router.get('/visibility-filters', loginValidators.authenticate, visibilityFilterController.getVisibilityFilters);

router.post(
  '/send-message',
  loginValidators.authenticate,
  messageValidators.validateSendMessageRequest,
  messageController.sendMessage
);

router.get('/chat-messages', loginValidators.authenticate, messageController.getAllMessages);

router.post('/login', loginValidators.validateLoginRequest, loginController.validateLogin);

router.get('/validate-session', loginValidators.authenticate, (req, res, next) => res.json(true));

export default router;
