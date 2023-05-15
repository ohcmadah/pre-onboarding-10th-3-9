import { Todo } from '../@types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  removeTodo: (id: Todo['id']) => void;
}

const TodoList = ({ todos, removeTodo }: TodoListProps) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} removeTodo={removeTodo} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};
export default TodoList;
