import { Module } from '@nestjs/common';
import { CreaturesController } from './creatures.controller';
import { CreaturesService } from './creatures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creature } from './creatures.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Creature])],
  controllers: [CreaturesController],
  providers: [CreaturesService]
})
export class CreaturesModule {}
