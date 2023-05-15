import { useEffect, useState } from 'react';

import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import { createTodo, getTodoList } from '../api/todo';
import { Todo } from '../@types/todo';

const Main = () => {
  const [todoListData, setTodoListData] = useState<Todo[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  const addTodo = async (text: string) => {
    try {
      setIsAdding(true);

      const trimmed = text.trim();
      if (!trimmed) {
        return alert('Please write something');
      }

      const newItem = { title: trimmed };
      const data = await createTodo(newItem);

      if (data) {
        return setTodoListData((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsAdding(false);
    }

    return undefined;
  };

  const removeTodo = (id: Todo['id']) => {
    setTodoListData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo addTodo={addTodo} disabled={isAdding} />
        <TodoList todos={todoListData} removeTodo={removeTodo} />
        {isAdding && <div className="icon icon-loading" />}
      </div>
    </div>
  );
};

export default Main;
