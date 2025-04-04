import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpedienteController } from './controllers/expediente.controller';
import { ExpedienteService } from './services/expediente.service';
import { ExpedienteAcademico } from './entities/expediente_academico.entity';
import { ExpedienteTipoTramite } from './entities/expediente_tipo_tramite.entity';
import { GlobalDominios } from '../biblioteca/entities/global_dominios.entity'; 
import { ExpedienteAcademicoDetalle } from './entities/expediente_academico_detalle.entity'; // Añadir aquí


@Module({
  imports: [TypeOrmModule.forFeature([ExpedienteAcademico, ExpedienteTipoTramite, GlobalDominios, ExpedienteAcademicoDetalle,])],
  controllers: [ExpedienteController],
  providers: [ExpedienteService],
})
export class ExpedienteModule {}
