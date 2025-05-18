import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,})
  ,DatabaseModule, MoviesModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
