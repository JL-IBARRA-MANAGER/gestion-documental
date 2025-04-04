import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliotecaService } from './services/biblioteca.service';
import { BibliotecaController } from './controllers/biblioteca.controller';
import { Titulacion } from './entities/biblioteca.entity';
import { Carrera } from './entities/carrera.entity';
import { ModalidadTitulacion } from './entities/modalidad_titulacion.entity';
import { GlobalDominios } from './entities/global_dominios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Titulacion, Carrera, ModalidadTitulacion, GlobalDominios])],
  providers: [BibliotecaService],
  controllers: [BibliotecaController],
})
export class BibliotecaModule {}
