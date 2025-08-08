import { Component, signal } from '@angular/core';
import { TaskManager } from '../components/task-manager/task-manager';

@Component({
  selector: 'app-root',
  standalone: true,         // DEFAULT E TRUE ! 
  imports: [TaskManager],
  templateUrl: './app.html',
})
export class App {
}


