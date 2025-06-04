import { Module } from '@nestjs/common';
import { CreaturesModule } from './creatures/creatures.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CreaturesModule, DatabaseModule, UserModule],
})
export class AppModule {}
