import { Post } from "./posts.interface";

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    posts?: Post[]
}


export type CreateUser = Omit<User, 'id' | 'posts'>;
export type UpdateUser = Partial<Omit<User, 'id' | 'posts'>>;

