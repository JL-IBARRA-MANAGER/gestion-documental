import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AprehenserController } from './controllers/aprehenser.controller';
import { AprehenserService } from './services/aprehenser.service';

import { AprehenserPaginaWeb } from './entities/aprehenser_pagina_web.entity';
import { Convocatoria } from './entities/convocatoria.entity';
import { GlobalDominios } from '../biblioteca/entities/global_dominios.entity';
import { Proyecto } from './entities/proyecto.entity';
import { NoticiasImagenes } from './entities/noticias_imagenes.entity';
import { AprehenserDesarrollo } from './entities/aprehenser_desarrollo.entity';
import { CursoRegistro } from './entities/curso_registro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AprehenserPaginaWeb, GlobalDominios, Convocatoria, Proyecto, NoticiasImagenes, AprehenserDesarrollo, CursoRegistro])],
  controllers: [AprehenserController],
  providers: [AprehenserService],
})
export class AprehenserModule {}
