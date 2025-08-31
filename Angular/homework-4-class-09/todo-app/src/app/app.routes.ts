import { Routes } from '@angular/router';
import { TodoList } from './components/todo-list/todo-list';
import { TodoAdd } from './components/todo-add/todo-add';
import { TodoEdit } from './components/todo-edit/todo-edit';
import { TodoDetails } from './components/todo-details/todo-details';

export const routes: Routes = [

    {path: '', component: TodoList},
    {path: 'todo-add', component: TodoAdd },
    {path:'todo-edit/:id', component: TodoEdit},
    {path:'todo-details/:id', component: TodoDetails}
];
