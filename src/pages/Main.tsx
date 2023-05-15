import { useEffect, useState } from 'react';

import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import { getTodoList } from '../api/todo';
import { Todo } from '../@types/todo';

const Main = () => {
  const [todoListData, setTodoListData] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  const addTodo = (newTodo: Todo) => {
    setTodoListData((prev) => [...prev, newTodo]);
  };

  const removeTodo = (id: Todo['id']) => {
    setTodoListData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo addTodo={addTodo} />
        <TodoList todos={todoListData} removeTodo={removeTodo} />
      </div>
    </div>
  );
};

export default Main;
