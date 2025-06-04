import { CreatureCreateDto } from './dto/create-creature.dto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Creature } from './creatures.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreaturesService {
    constructor(
        @InjectRepository(Creature)
        private readonly creatureRepository: Repository<Creature>,
    ){}

    async create(CreatureCreateDto: CreatureCreateDto){
        const existingCreature = await this.creatureRepository.findOneBy({
            name: CreatureCreateDto.name,
        })
        if (existingCreature) {
            throw new ConflictException(`Creature with name ${CreatureCreateDto.name} already exists.`);
        }
        return this.creatureRepository.save(CreatureCreateDto);
    }

    async findAll(): Promise<Creature[]>{
        return this.creatureRepository.find()
    }


    async findOneById(id: string){
        const creature = await this.creatureRepository.findOneBy({
            id,
        })
        if(!creature){
            throw new NotFoundException(`Creature with id ${id} not found.`);   
        }
        return creature;
    }

    async update(id: string, CreatureCreateDto: CreatureCreateDto): Promise<Creature> {
        await this.findOneById(id);

        const existingCreature = await this.creatureRepository.findOneBy({
            name: CreatureCreateDto.name,
        });
        if (existingCreature && existingCreature.id !== id) {
            throw new ConflictException(`Creature with name ${CreatureCreateDto.name} already exists.`);
        }
        await this.creatureRepository.update(id, CreatureCreateDto);
        return this.findOneById(id);
        
    }

    async delete(id:string): Promise<void>{
        await this.creatureRepository.softDelete(id);
    }


}
