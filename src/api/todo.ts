import { Todo } from '../@types/todo';
import instance from './index';

const RESOURCE = '/todos';

export const getTodoList = async () => {
  try {
    const response = await instance.get<Todo[]>(`${RESOURCE}`);

    return response;
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};

export const createTodo = async (data: Pick<Todo, 'title'>) => {
  try {
    const response = await instance.post<Todo>(`${RESOURCE}`, data);

    return response;
  } catch (error) {
    throw new Error('API createTodo error');
  }
};

export const deleteTodo = async (id: Todo['id']) => {
  try {
    const response = await instance.delete(`${RESOURCE}/${id}`);

    return response;
  } catch (error) {
    throw new Error('API deleteTodo error');
  }
};
