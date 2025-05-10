import { CreateUser, UpdateUser } from './../common/types/users.interface';
import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/common/types/users.interface';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class UsersService {
    constructor(
    @Inject(forwardRef(() => PostsService))
    private postsService: PostsService,
  ) {}
  private users: User[] = [
    { id: 1, name: 'Zoran', email: 'nakovzoran99@gmail.com', role: 'admin' },
    { id: 2,name: 'Kristijan',email: 'kristijan123@gmail.com',role: 'admin'},
    { id: 3, name: 'David', email: 'david123@gmail.com', role: 'admin' },
  ];
  findAll(): User[] {
    return this.users;
  }

  create(body: CreateUser): User {
    const exists = this.users.some((user) => user.email === body.email);
    if (exists) {
      throw new ConflictException('User with this email already exists');
    }
    const newUser = {
      ...body,
      id: this.users.length + 1,
    } satisfies User;
    this.users.push(newUser);
    return newUser;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  findOneWithPosts(id: number): User {
    const user = this.findOne(id);
    const posts = this.postsService.findByAuthorId(id);
    return { ...user, posts };
  }

 

  update(id: number, body: UpdateUser): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex < 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const updatedUser = {
      ...this.users[userIndex],
      ...body,
      id,
    };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }
  delete(id: number): void {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex < 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}
