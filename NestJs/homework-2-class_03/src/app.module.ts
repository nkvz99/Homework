import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookStoreController } from './book-store/book-store.controller';

@Module({
  imports: [],
  controllers: [AppController, BookStoreController],
  providers: [AppService],
})
export class AppModule {}
