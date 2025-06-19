import { useState } from "react";
import { AddTodo } from "../Add Todo/AddTodo";
import {TodoList}  from "../Todo List/TodoList";
import { todosData } from "../../data/todo.data";
import  type  {Todo} from "../../types/todo.type";

const TodoManager = () => {
  const [todos, setTodos] = useState<Todo[]>(todosData);

  const [inputValue, setInputValue] = useState<string>('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: todos.length + 1,
        description: inputValue.trim(),
        isDone: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const finishTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isDone: true } : todo
    ));
  };

  return (
    <div>
      <AddTodo 
        inputValue={inputValue}
        setInputValue={setInputValue}
        onAddTodo={addTodo}
      />
      <TodoList 
        todos={todos}
        onFinish={finishTodo}
      />
    </div>
  );
};

export default TodoManager;
