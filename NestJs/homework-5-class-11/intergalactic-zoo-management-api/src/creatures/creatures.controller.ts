import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreatureCreateDto } from './dto/create-creature.dto';
import { Creature } from './creatures.entity';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatureUpdateDto } from './dto/update-creature.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Role } from 'src/common/types/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
@ApiTags('Creatures')
@ApiBearerAuth()
@Controller('creatures')
export class CreaturesController {
    constructor(private readonly creaturesService: CreaturesService) { }

    @ApiOperation({
        summary: 'Create a new creature',
    })
    @ApiBody({ type: CreatureCreateDto })
    @ApiCreatedResponse({
        description: 'The creature has been successfully created.',
        type: Creature,
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Please check the provided details.',
        type: CreatureCreateDto,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Zookeeper)
    @Post()
    async create(@Body() creatureCreateDto: CreatureCreateDto): Promise<Creature> {
        return this.creaturesService.create(creatureCreateDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all creatures'
    })
    @ApiOkResponse({
        description: 'List of all creatures',
        type: [Creature],
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Zookeeper , Role.Visitor)
    async findAll(): Promise<Creature[]> {
        return this.creaturesService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get a creature by ID',
    })
    @ApiOkResponse({
        description: 'The creature has been successfully retrieved.',
        type: Creature,
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Zookeeper, Role.Visitor)
    async findOneById(@Param('id')id: string): Promise<Creature> {
        return this.creaturesService.findOneById(id);
    }



    @Patch(':id')
    @ApiOperation({
        summary: 'Update a creature by ID',
    })
    @ApiBody({ type: CreatureUpdateDto })
    @ApiOkResponse({
        description: 'The creature has been successfully updated.',
        type: Creature,
    })
    @ApiNotFoundResponse({
        description: 'Creature not found with the provided ID.',
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Please check the provided details.',
        type: CreatureUpdateDto,
    })
    @UseGuards(JwtAuthGuard , RolesGuard)
    @Roles(Role.Zookeeper)
    update(@Param('id')id: string, @Body() CreatureUpdateDto: CreatureUpdateDto): Promise<Creature> {
        return this.creaturesService.update(id, CreatureUpdateDto);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a creature by ID',}
    )
    @ApiParam({
        name: 'id',
        description: 'The ID of the creature to delete',
    })
    @ApiNoContentResponse({
        description: 'The creature has been successfully deleted.',
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Zookeeper)
    async delete(@Param('id') id:string){
        await this.creaturesService.delete(id);
    }
}
