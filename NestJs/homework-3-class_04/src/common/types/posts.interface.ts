import { User } from "./users.interface";


export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
    author?: User;
}

export type CreatePost = Omit<Post, 'id' | 'author'>;
export type UpdatePost = Partial<Pick<Post, 'title' | 'content'>>;

