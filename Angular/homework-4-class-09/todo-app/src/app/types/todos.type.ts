export enum TodoStatus{
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}

export interface Todo {
    id: string;
    title: string;
    description: string;
    status: TodoStatus;
}

export type UpdateTodo = Omit<Todo, 'id'>;



