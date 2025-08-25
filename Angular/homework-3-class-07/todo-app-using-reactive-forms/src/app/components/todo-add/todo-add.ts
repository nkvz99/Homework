import { Component } from '@angular/core';
import { TodosService } from '../../services/todos';
import {

  FormGroup,
  ReactiveFormsModule,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-todo-add',
  imports: [ ReactiveFormsModule],
  templateUrl: './todo-add.html',
  styleUrl: './todo-add.css',
})
export class TodoAdd {
  constructor(
    private readonly fb: NonNullableFormBuilder
  ) {}
  todoForm: FormGroup;

  ngOnInit() {
    this.todoForm = new FormGroup(
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
      },
      {
        // This is the default behavior for form controls and validate live as the user types
        updateOn: 'change',
      }
    );
  }


  onHandleSubmit(){
    const isInvalid = this.todoForm.invalid;
    if (isInvalid) {
      return;
    }
  }



  getAllErrorMessages(fieldName: string): string {
  const control = this.todoForm.get(fieldName);
  
  if (!control?.errors || !control?.touched) return '';
  
  const errors = control.errors;
  
  if (errors['required']) return `${fieldName} is required`;
  if (errors['minlength']) return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
  if (errors['maxlength']) return `${fieldName} cannot exceed ${errors['maxlength'].requiredLength} characters`;
  
  return '';
}

}
