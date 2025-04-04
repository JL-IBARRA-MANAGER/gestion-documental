// src/vinculacion/vinculacion.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VinculacionController } from './controllers/vinculacion.controller';
import { VinculacionService } from './services/vinculacion.service';
import { VinculacionEmpresaController } from './controllers/vinculacion_empresa.controller'; 
import { VinculacionEmpresaService } from './services/vinculacion_empresa.service';
import { VinculacionDatosController } from './controllers/vinculacion_datos.controller';  
import { VinculacionDatosService } from './services/vinculacion_datos.service';  

import { VinculacionConveniosCartas } from './entities/vinculacion_convenios_cartas.entity';
import { VinculacionEmpresas } from './entities/vinculacion_empresas.entity';
import { VinculacionEmpresaTipo } from './entities/vinculacion_empresa_tipo.entity'; 
import { VinculacionPracticaTipo } from './entities/vinculacion_practica_tipo.entity'; 
import { VinculacionCineCampoAmplio } from './entities/vinculacion_cine_campo_amplio.entity';
import { VinculacionCineCampoEspecifico } from './entities/vinculacion_cine_campo_especifico.entity';
import { VinculacionCineCampoDetallado } from './entities/vinculacion_cine_campo_detallado.entity';
import { VinculacionPractica } from './entities/vinculacion_practica.entity';

import { GlobalDominios } from '../biblioteca/entities/global_dominios.entity'; 

import { VinculacionPracticaEstudiante } from './entities/vinculacion_practica_estudiante.entity';
import { VinculacionPracticaEstudianteEstados } from './entities/vinculacion_practica_estudiante_estados.entity';


import { VinculacionCodigoProgramaBanner } from './entities/vinculacion-codigo-programa-banner.entity'; 

import { AsistenciaEstudiante } from './entities/asistencia-estudiante.entity'; 
import { PracticaSeguimiento } from './entities/practica-seguimiento.entity';  

@Module({
  imports: [
    TypeOrmModule.forFeature([VinculacionConveniosCartas, VinculacionEmpresas, VinculacionEmpresaTipo, VinculacionPracticaTipo, VinculacionCineCampoAmplio, GlobalDominios,
      VinculacionCineCampoEspecifico, VinculacionCineCampoDetallado, VinculacionPractica, VinculacionPracticaEstudiante, VinculacionPracticaEstudianteEstados,  AsistenciaEstudiante,
      VinculacionCodigoProgramaBanner, PracticaSeguimiento,]),  
  ],
  controllers: [VinculacionController, VinculacionEmpresaController, VinculacionDatosController],  
  providers: [VinculacionService, VinculacionEmpresaService, VinculacionDatosService],  
})
export class VinculacionModule {}
