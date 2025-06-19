import './TodoList.css';

import  type  {Todo} from "../../types/todo.type";
import { TodoItem } from "../Todo Item/TodoItem";

interface TodoListProps {
  todos: Todo[];
  onFinish: (id: number) => void;
}


export const TodoList = ({todos, onFinish}: TodoListProps) => {
return (
    <div className="todo-list">
      <h3 className="todo-list-title">My Todos:</h3>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onFinish={onFinish} 
        />
      ))}
    </div>
)
}