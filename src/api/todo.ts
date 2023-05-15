import { Todo } from '../@types/todo';
import instance from './index';

const RESOURCE = '/todos';

export const getTodoList = async () => {
  try {
    const response = await instance.get<Todo[]>(`${RESOURCE}`);

    if (response.opcode === 200) {
      return response.data;
    }

    throw new Error(response.message);
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};

export const createTodo = async (data: Pick<Todo, 'title'>) => {
  try {
    const response = await instance.post<Todo>(`${RESOURCE}`, data);

    if (response.opcode === 200) {
      return response.data;
    }

    throw new Error(response.message);
  } catch (error) {
    throw new Error('API createTodo error');
  }
};

export const deleteTodo = async (id: Todo['id']) => {
  try {
    const response = await instance.delete<Todo>(`${RESOURCE}/${id}`);

    if (response.opcode === 200) {
      return response.data;
    }

    throw new Error(response.message);
  } catch (error) {
    throw new Error('API deleteTodo error');
  }
};
