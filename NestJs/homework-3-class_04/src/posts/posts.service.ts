
import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePost, Post, UpdatePost } from 'src/common/types/posts.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
    constructor(
        @Inject(forwardRef(() => UsersService ))
        private readonly UsersService: UsersService) {}
    private posts = [
        { id: 1 , title: ' First Post ', content: 'This is the first post', authorId: 1 },
        { id: 2 , title: ' Second Post ', content: 'This is the second post', authorId: 2 },
        { id: 3 , title: ' Third Post ', content: 'This is the third post', authorId: 3 },
        {id: 4 , title: ' Fourth Post ', content: 'This is the fourth post', authorId: 2 },
    ]
    findAll() {
        return this.posts;
    }
    create(body: CreatePost): Post {
        if (!this.UsersService.findOne(body.authorId)) {
            throw new NotFoundException(`User with id ${body.authorId} not found`);
        }
        const newPost = {
            id: this.posts.length + 1,
            ...body,
            
        } satisfies Post;   
        this.posts.push(newPost);
        return newPost;
  }
    findOne(id: number): Post {
        const post = this.posts.find((p) => p.id === id);
        if (!post) {
            throw new NotFoundException(`Post with id ${id} not found`);
        }
        return post;
    }

    findByAuthorId(authorId: number): Post[] {
        return this.posts.filter((p) => p.authorId === authorId);
    }

update(id: number, body: UpdatePost): Post {
    const postIndex = this.posts.findIndex((p) => p.id === id);
    if (postIndex < 0) {
        throw new NotFoundException(`Post with id ${id} not found`);
    }
    
    const currentPost = { ...this.posts[postIndex] };

    currentPost.title = body.title ?? currentPost.title;
    currentPost.content = body.content ?? currentPost.content;
    
    currentPost.id = id;
    
    this.posts[postIndex] = currentPost;
    return currentPost;
}
delete(id: number): void {
    const postIndex = this.posts.findIndex((p) => p.id === id);
    if (postIndex < 0) {
        throw new NotFoundException(`Post with id ${id} not found`);
    }
    this.posts.splice(postIndex, 1);
}
}
