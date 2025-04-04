import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternacionalizacionService } from './internacionalizacion.service';
import { InternacionalizacionController } from './internacionalizacion.controller';
import { Internacionalizacion } from './internacionalizacion.entity';
import { InterAreaconEspecificoService } from './inter_areacon_especifico.service';
import { InterAreaconEspecificoController } from './inter_areacon_especifico.controller';
import { InterAreaconEspecifico } from './inter_areacon_especifico.entity';
import { InterAreaConocimientoService } from './inter_area_conocimiento.service';
import { InterAreaConocimientoController } from './inter_area_conocimiento.controller';
import { InterAreaConocimiento } from './inter_area_conocimiento.entity';
import { InterCarreraService } from './inter_carrera.service';
import { InterCarreraController } from './inter_carrera.controller';
import { InterCarrera } from './inter_carrera.entity';
import { InterFinanciamientoService } from './inter_financiamiento.service';
import { InterFinanciamientoController } from './inter_financiamiento.controller';
import { InterFinanciamiento } from './inter_financiamiento.entity';
import { InterModalidadService } from './inter_modalidad.service';
import { InterModalidadController } from './inter_modalidad.controller';
import { InterModalidad } from './inter_modalidad.entity';
import { InterNivelService } from './inter_nivel.service';
import { InterNivelController } from './inter_nivel.controller';
import { InterNivel } from './inter_nivel.entity';
import { InterPaisService } from './inter_pais.service';
import { InterPaisController } from './inter_pais.controller';
import { InterPais } from './inter_pais.entity';
import { InterSedeService } from './inter_sede.service';
import { InterSedeController } from './inter_sede.controller';
import { InterSede } from './inter_sede.entity';
import { InterTipoParticipanteService } from './inter_tipo_participante.service';
import { InterTipoParticipanteController } from './inter_tipo_participante.controller';
import { InterTipoParticipante } from './inter_tipo_participante.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Internacionalizacion,
      InterAreaconEspecifico,
      InterAreaConocimiento,
      InterCarrera,
      InterFinanciamiento,
      InterModalidad,
      InterNivel,
      InterPais,
      InterSede,
      InterTipoParticipante,
    ]),
  ],
  controllers: [
    InternacionalizacionController,
    InterAreaconEspecificoController,
    InterAreaConocimientoController,
    InterCarreraController,
    InterFinanciamientoController,
    InterModalidadController,
    InterNivelController,
    InterPaisController,
    InterSedeController,
    InterTipoParticipanteController,
  ],
  providers: [
    InternacionalizacionService,
    InterAreaconEspecificoService,
    InterAreaConocimientoService,
    InterCarreraService,
    InterFinanciamientoService,
    InterModalidadService,
    InterNivelService,
    InterPaisService,
    InterSedeService,
    InterTipoParticipanteService,
  ],
})
export class InternacionalizacionModule {}
