import Boom from 'boom';
import Todos from '../models/todos';
import logger from '../utils/logger';
import VisibilityFilters from '../models/visibilityFilter';

/**
 * Get all todos.
 *
 * @return {Promise}
 */
export async function getAllTodos(filter) {
  let todos = [];

  if (!filter) {
    logger.log('Fetching all todos');

    todos = await Todos.fetchAll();

    logger.log('Todos fetched', todos);

    return {
      data: todos,
      message: 'Selected todos'
    };
  }

  logger.log('Checking if the selected filter exists');

  const visibilityFilter = await VisibilityFilters.where({ name: filter }).fetch();

  if (!visibilityFilter) {
    logger.log('Selected visibility filter not found');

    throw new Boom.badRequest(`The requested filter type doesn't exist`);
  }

  logger.log('Fetching todos with filter: ', filter);

  const filterPayload = getFilterPayload(filter);

  todos = await Todos.where(filterPayload).fetchAll();

  logger.log(`Fetched todos with filter: '${filter}' with data`, todos);

  return {
    data: todos,
    message: 'Selected todos'
  };
}

function getFilterPayload(filter) {
  switch (filter) {
    case 'active':
      return {
        is_active: 1
      };

    case 'completed':
      return {
        is_completed: 1
      };

    case 'all':
    default:
      return {};
  }
}

/**
 * Get a todo by id.
 *
 * @param {number|string} id
 * @return {Promise}
 */
export async function getTodo(id) {
  logger.log(`Fetching todo with id: ${id}`);

  await new Todos({ id }).fetch().then(todo => {
    if (!todo) {
      throw new Boom.notFound('Todo not found');
    }

    return {
      data: todo,
      message: 'Todo detail'
    };
  });
}

/**
 * Create new todo.
 *
 * @param  {object}  todo
 * @return {Promise}
 */
export async function createTodo(payload) {
  logger.log(`Creating a new todo`);

  const result = await new Todos({ text: payload.text, isActive: 1, isCompleted: 0 })
    .save()
    .then(todo => todo.refresh());

  logger.log(`New todo created:`, result);

  return {
    data: result,
    message: 'Todo created successfully'
  };
}

/**
 * Update a todo.
 *
 * @param {number|string} id
 * @param {object}  payload
 * @return {Promise}
 */
export async function updateTodo(id, payload) {
  logger.log(`Checking if the todo with id ${id} exists`);

  const todo = await new Todos({ id }).fetch();

  if (!todo) {
    throw new Boom.notFound('Todo not found');
  }

  logger.log(`Updating todo with id ${id}`);

  const result = await new Todos({ id }).save(payload, { patch: true }).then(todo => todo.refresh());

  return {
    data: result,
    message: 'Todo updated successfully'
  };
}

/**
 * Delete a todo.
 *
 * @param  {number|string}  id
 * @return {Promise}
 */
export async function deleteTodo(id) {
  logger.log(`Deleting todo with id ${id}`);

  await new Todos({ id }).fetch().then(todo => todo.destroy());

  return {
    message: 'Todo deleted successfully'
  };
}
