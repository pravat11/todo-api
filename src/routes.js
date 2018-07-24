import { Router } from 'express';

import * as todoValidators from './validators/todo';
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

router.get('/todo/:id', todosController.getTodo);

router.get('/todos', todosController.getTodos);

router.post('/todo', todoValidators.validateCreateTodoRequest, todosController.addTodo);

router.put('/todo/:id', todoValidators.validateUpdateTodoRequest, todosController.updateTodo);

router.delete('/todo/:id', todosController.removeTodo);

router.get('/visibility-filters', visibilityFilterController.getVisibilityFilters);

router.post('/send-message', messageValidators.validateSendMessageRequest, messageController.sendMessage);

export default router;
