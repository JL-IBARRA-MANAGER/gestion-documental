// src/global_sede/global_sede.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalSedeService } from './services/global_sede.service';
import { GlobalSedeController } from './controllers/global_sede.controller';
import { GlobalSede } from './entities/global_sede.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalSede])],
  controllers: [GlobalSedeController],
  providers: [GlobalSedeService],
})
export class GlobalSedeModule {}
