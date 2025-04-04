import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActasService } from './services/actas.service';
import { ActasController } from './controllers/actas.controller';

import { Acta } from './entities/acta.entity';
import { GlobalDominios } from '../biblioteca/entities/global_dominios.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Acta, GlobalDominios])],
  controllers: [ActasController],
  providers: [ActasService],
})
export class ActasModule {}
