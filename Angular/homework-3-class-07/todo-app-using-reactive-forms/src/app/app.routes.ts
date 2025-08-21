import { Routes } from '@angular/router';
import { TodoList } from './components/todo-list/todo-list';
import { TodoAdd } from './components/todo-add/todo-add';

export const routes: Routes = [

    {path: '', component: TodoList},
    {path: 'todo-add', component: TodoAdd }
];
