import { UpdateTodo } from './../types/todos.type';
import { Injectable } from '@angular/core';
import { Todo, TodoStatus } from '../types/todos.type';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';


const TODOS: Todo[] = [
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


  constructor(private readonly router: Router) {}
  createTodo(title: string, description: string) {
    const newTodo: Todo = {
      id: uuid(),
      title,
      description,
      status: TodoStatus.PENDING
    }
    const curentTodos = this._todos.value;
    this._todos.next([...curentTodos, newTodo]);
  }

  deleteTodo(id: string) {
    const todos = this._todos.getValue().filter(todo => todo.id !== id);
    this._todos.next(todos);
    this.navigateToHome();
  }


  updateTodoStatus(id: string, status: TodoStatus) {
    const currentTodos = this._todos.getValue();
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? { ...todo, status } : todo
    );
    this._todos.next(updatedTodos);
  }

  getTodoById(id: string): Observable<Todo | undefined> {
    return this.todos$.pipe(
      map((todos) => todos.find(todo => todo.id === id))
    )
  };

  updateTodo(
    id: string,
    UpdateTodo: UpdateTodo
  ): Observable<boolean> {
    const currentTodos = this._todos.getValue();
    const todoExists = currentTodos.some((todo) => todo.id === id);

    if (!todoExists) return of(false);

    const updatedTodos = currentTodos.map((todo) => {
      if (todo.id !== id) return todo;

      const { title, description, status } = UpdateTodo;
      const updatedTodo: Todo = {
        title,
        description,
        status,
        id: todo.id
      };
      return updatedTodo;
    })
      ; this._todos.next(updatedTodos);
    return of(true);
  }


  navigateToHome(){
    this.router.navigate(['/']);
  }
}

