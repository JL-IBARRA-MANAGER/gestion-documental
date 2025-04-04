import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositorioController } from './controllers/repositorio.controller';
import { RepositorioService } from './services/repositorio.service';
import { ReglamentoAcademico } from './entities/reglamento-academico.entity';
import { GlobalDominios } from '../biblioteca/entities/global_dominios.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([GlobalDominios, ReglamentoAcademico]), 
  ],
  controllers: [RepositorioController],
  providers: [RepositorioService],
})
export class RepositorioModule {}
