import Boom from 'boom';
import Todos from '../models/todos';

/**
 * Get all todos.
 *
 * @return {Promise}
 */
export async function getAllTodos() {
  const todos = await Todos.fetchAll();

  return {
    data: todos,
    message: 'All todos'
  };
}

/**
 * Get a todo by id.
 *
 * @param {number|string} id
 * @return {Promise}
 */
export async function getTodo(id) {
  return await new Todos({ id }).fetch().then(todo => {
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
  const result = await new Todos({ text: payload.text, isActive: true, isCompleted: false })
    .save()
    .then(todo => todo.refresh());

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
  const todo = await new Todos({ id }).fetch();

  if (!todo) {
    throw new Boom.notFound('Todo not found');
  }

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
  await new Todos({ id }).fetch().then(todo => todo.destroy());

  return {
    message: 'Todo deleted successfully'
  };
}
