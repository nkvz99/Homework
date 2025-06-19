import  type  {Todo} from "../../types/todo.type";
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onFinish: (id: number) => void;
}

export  const TodoItem = ({ todo, onFinish }: TodoItemProps) => {
  return (
    <div className={`todo-item ${todo.isDone ? 'completed' : ''}`}>
      <span className="todo-description">
        {todo.description}
      </span>
      {!todo.isDone && (
        <button onClick={() => onFinish(todo.id)} className="finish-btn">
          FINISH
        </button>
      )}
    </div>
  );
};

