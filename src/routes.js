import { Router } from 'express';
import * as validators from './validators/todo';
import * as todosController from './controllers/todos';
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

router.post('/todo', validators.validateCreateTodoRequest, todosController.addTodo);

router.put('/todo/:id', validators.validateUpdateTodoRequest, todosController.updateTodo);

router.delete('/todo/:id', todosController.removeTodo);

router.get('/visibility-filters', visibilityFilterController.getVisibilityFilters);

export default router;
