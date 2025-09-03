import { TodosService } from './../../services/todos';
import { ActivatedRoute, Router } from '@angular/router';

import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo, TodoStatus, UpdateTodo } from '../../types/todos.type';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-edit.html',
  styleUrl: './todo-edit.css'
})
export class TodoEdit {
  todoEdit: FormGroup;
  todoStatus = Object.values(TodoStatus);

  subscriptions: Subscription[] = [];
  selectedStatuses: { [key: string]: TodoStatus } = {};
  currentTodoId: string;

  constructor(

    private readonly router: Router,
    private readonly TodosService: TodosService,
    private readonly activeRoute: ActivatedRoute,
    private readonly fb: NonNullableFormBuilder
  ) { }


  ngOnInit() {
    this.initializeForm();
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.currentTodoId = id;
      this.loadTodoForEdit(id);
    }
  }

  loadTodoForEdit(id: string) {
    this.subscriptions.push(
      this.TodosService.getTodoById(id).subscribe({
        next: (todo) => {
          if (todo) {
            this.populateForm(todo);
          }
        },
        error: (error) => {
          console.log('Error loading todo', error);
          this.router.navigate(['/']);
        },
      })
    );
  }

  private populateForm(todo: Todo) {
    this.todoEdit.patchValue({
      title: todo.title,
      description: todo.description,
      status: todo.status
    })
  }


  private initializeForm() {
    this.todoEdit = this.fb.group(
      {
        title: this.fb.control('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
        description: this.fb.control('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
        status: this.fb.control('', [Validators.required]),
      },
      {
        // This is the default behavior for form controls and validate live as the user types
        updateOn: 'change',
      }
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getStatusLabel(status: TodoStatus): string {
    const labels = {
      [TodoStatus.PENDING]: 'Pending ⌛',
      [TodoStatus.IN_PROGRESS]: 'In Progress 🔄',
      [TodoStatus.COMPLETED]: 'Completed ✅'

    }
    return labels[status] || status
  }

  deleteTodo() {
    if(this.currentTodoId){
      this.TodosService.deleteTodo(this.currentTodoId)
  }
}


  onHandleSubmit() {
    if (this.todoEdit.invalid) {
      this.todoEdit.markAllAsTouched();
      return;
    }

    const todoValues = this.todoEdit.value;

    const UpdatedTodos: UpdateTodo = {
      title: todoValues.title,
      description: todoValues.description,
      status: todoValues.status as TodoStatus,
    };


    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (!id) {
      console.log('Invalid ID');
      return;
    }


    this.subscriptions.push(
      this.TodosService.updateTodo(this.currentTodoId, UpdatedTodos).subscribe({
        next: (result) => {
          if (result) {
            this.router.navigate(['/todo-details', this.currentTodoId]);
          }

        },
        error: (error) => {
          console.log('Error updating todo', error);
        }
      })
    );
  }

  getAllErrorMessages(fieldName: string): string {
    const control = this.todoEdit.get(fieldName);

    if (!control?.errors || !control?.touched) return '';

    const errors = control.errors;

    if (errors['required']) return `${fieldName} is required`;
    if (errors['minlength']) return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength']) return `${fieldName} cannot exceed ${errors['maxlength'].requiredLength} characters`;

    return '';
  }

  NavigateBackToDetailsTodo(){
    this.router.navigate(['/todo-details', this.currentTodoId]);
  }




}
