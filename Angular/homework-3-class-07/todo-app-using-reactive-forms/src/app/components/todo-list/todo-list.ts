import { TodoStatus } from './../../types/todos.type';
import { TodosService } from './../../services/todos';
import { Component, signal } from '@angular/core';
import { Todo,  } from '../../types/todos.type';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {

  TodoStatus = TodoStatus;

  todos = signal<Todo[]>([]);
  selectedStatuses: { [key: string]: TodoStatus } = {};

  constructor( private readonly TodosService: TodosService) {}

  ngOnInit() {
    this.TodosService.todos$.subscribe(todos => {
      this.todos.set(todos);

      // Ги полниме почетните вредности за dropdown-от
      todos.forEach(todo => {
        this.selectedStatuses[todo.id] = todo.status;
      });
    });
  }

  getStatusLabel(status: TodoStatus): string{
    const labels = {
      [TodoStatus.PENDING]: 'Pending',
      [TodoStatus.IN_PROGRESS]: 'In Progress',
      [TodoStatus.COMPLETED]: 'Completed'

    }
    return labels[status] || status
  }

  updateTodoStatus(id: string, status: TodoStatus) {
    const newStatus = this.selectedStatuses[id];
    this.TodosService.updateTodoStatus(id, newStatus);
  }

  deleteTodo(id:string){
    this.TodosService.deleteTodo(id);
  }

  
}
