import { FaSpinner, FaTrash } from 'react-icons/fa';
import { useCallback, useState } from 'react';

import { deleteTodo } from '../api/todo';
import { Todo } from '../@types/todo';

interface TodoItemProps {
  id: Todo['id'];
  title: Todo['title'];
  removeTodo: (id: Todo['id']) => void;
}

const TodoItem = ({ id, title, removeTodo }: TodoItemProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteTodo(id);

      removeTodo(id);
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [id, removeTodo]);

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button type="button" onClick={() => handleRemoveTodo()}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </div>
    </li>
  );
};
export default TodoItem;
