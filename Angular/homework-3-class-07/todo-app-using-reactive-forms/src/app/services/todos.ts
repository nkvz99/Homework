import { Injectable } from '@angular/core';
import { Todo, TodoStatus } from '../types/todos.type';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';


const TODOS: Todo[]= [
  { id: '1', title: 'Learn Angular', description: 'Study the Angular framework', status: TodoStatus.PENDING },
  { id: '2', title: 'Build a Todo App', description: 'Create a simple todo application', status: TodoStatus.IN_PROGRESS },
  { id: '3', title: 'Deploy the App', description: 'Deploy the todo app to production', status: TodoStatus.COMPLETED },
]

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private _todos = new BehaviorSubject(TODOS);
  todos$ = this._todos.asObservable();


  constructor(){}
  createTodo(title: string, description:string){
    const newTodo: Todo = {
      id: uuid(),
      title,
      description,
      status: TodoStatus.PENDING
    }
    const curentTodos = this._todos.value;
    this._todos.next([...curentTodos, newTodo]);
  }

  deleteTodo(id:string){
    const todos = this._todos.getValue().filter(todo => todo.id !== id);
    this._todos.next(todos);
  }


  updateTodoStatus(id:string, status: TodoStatus) {
    const currentTodos = this._todos.getValue();
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? {... todo , status} : todo
    );
    this._todos.next(updatedTodos);
  }


};
