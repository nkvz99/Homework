import { Todo, TodoStatus } from './../../types/todos.type';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TodosService } from '../../services/todos';

@Component({
  selector: 'app-todo-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './todo-details.html',
  styleUrl: './todo-details.css'
})
export class TodoDetails {
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly todosService = inject(TodosService);
  TodoStatus = TodoStatus;

    selectedStatuses: { [key: string]: TodoStatus } = {};

  todo = signal<Todo>({} as Todo)
  todoObs: Observable<Todo | undefined>;

  
    ngOnInit() {
      const id = this.activeRoute.snapshot.paramMap.get('id');

    if(id){
      this.todosService.getTodoById(id).subscribe((data) =>{
        if(data)
          this.todo.set(data);}
      );
      this.todoObs = this.todosService.getTodoById(id);
    }

    }

    navigateToHome(){
      this.todosService.navigateToHome();
    }
    getStatusClass(status: TodoStatus): string {
  const classes = {
    [TodoStatus.PENDING]: 'pending',
    [TodoStatus.IN_PROGRESS]: 'in-progress', 
    [TodoStatus.COMPLETED]: 'completed'
  };
  return classes[status] || '';
}

getStatusLabel(status: TodoStatus): string {
    const labels = {
      [TodoStatus.PENDING]: 'Pending ⌛',
      [TodoStatus.IN_PROGRESS]: 'In Progress 🔄',
      [TodoStatus.COMPLETED]: 'Completed ✅'

    }
    return labels[status] || status
  }

  
    
  }




