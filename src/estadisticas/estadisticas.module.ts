// src/estadisticas/estadisticas.module.ts
import { Module } from '@nestjs/common';
import { EstadisticasController } from './controllers/estadisticas.controller';
import { EstadisticasService } from './services/estadisticas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estadistica } from './entities/estadistica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estadistica])],
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
})
export class EstadisticasModule {}
