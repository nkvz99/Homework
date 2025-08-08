import { Component } from '@angular/core';
import { TaskManger } from '../../app/types/task-manager.type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.css',
  standalone: true,
})
export class TaskManager {
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  tasks: TaskManger[] = [];

  addTask() {
    if(this.newTaskTitle.trim() === '') {
      return; 
    }
    
    const newTask: TaskManger = {
      id: this.tasks.length + 1,
      title: this.newTaskTitle.trim(), 
      description: this.newTaskDescription.trim(),
      completed: false,
    };
    
    this.tasks.push(newTask); 
    this.newTaskTitle = ''; 
    this.newTaskDescription = '';
  }

  toggleCompleted(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }

  deleteTask(task: TaskManger) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }
  getcompletedTasksCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }
  getpendingTasksCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

  getallTasksCount(): number {
    return this.tasks.length;
  }
}