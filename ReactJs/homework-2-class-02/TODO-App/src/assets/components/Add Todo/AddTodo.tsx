import  './AddTodo.css';

interface AddTodoProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onAddTodo: () => void;
}


export  const AddTodo = ({inputValue, setInputValue, onAddTodo}: AddTodoProps) => {
    return (
    <div className="add-todo">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a new todo"
        className="todo-input"
      />
      <button onClick={onAddTodo} className="add-btn">
        Create Todo
      </button>
    </div>
  );
}