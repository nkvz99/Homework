import { Todo } from './../../types/todos.type';

import { TodoStatus } from '../../types/todos.type';
import { Component } from '@angular/core';
import { TodosService } from '../../services/todos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-add',
  imports: [FormsModule],
  templateUrl: './todo-add.html',
  styleUrl: './todo-add.css'
})
export class TodoAdd {
  constructor(private readonly todoService: TodosService) { }
  title: string = '';
  description: string = '';


  clearInputs() {
    this.title = '';
    this.description = '';
  }

  addTodo() {
    if (!this.title || !this.description) {
      alert('Please fill in all fields');
      return;
    }
    this.todoService.createTodo
      (this.title, this.description);
    this.clearInputs();
  }
}
