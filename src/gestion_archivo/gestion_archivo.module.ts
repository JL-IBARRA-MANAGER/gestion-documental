import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestionArchivoService } from './services/gestion_archivo.service';
import { GestionArchivoController } from './controllers/gestion_archivo.controller';
import { UnidadAcademicaAdmin } from './entities/unidad_academica_admin.entity';
import { SubUnidadAcademicaAdmin } from './entities/sub_unidad_academica_admin.entity';
import { CuadroGeneralClasificacion } from './entities/cuadro_general_clasificacion.entity';
import { DatoExpediente } from './entities/dato_expediente.entity';
import { EstructuraOrganizacional } from './entities/estructura_organizacional.entity';
import { GlobalDominios } from '../biblioteca/entities/global_dominios.entity'; 


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UnidadAcademicaAdmin, 
      SubUnidadAcademicaAdmin, 
      CuadroGeneralClasificacion, 
      DatoExpediente,
      GlobalDominios,
      EstructuraOrganizacional
    ]),
  ],
  controllers: [GestionArchivoController],
  providers: [GestionArchivoService],
})
export class GestionArchivoModule {}
