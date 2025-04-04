import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitulacionController } from './controllers/titulacion.controller';
import { TitulacionService } from './services/titulacion.service';
import { UsuarioCarreraPrivilegios } from './entities/usuario_carrera_privilegios.entity';
import { Usuario } from './entities/usuario.entity';
import { Carrera } from './entities/carrera.entity';
import { RolUsuario } from './entities/rol_usuario.entity';
import { Rol } from './entities/rol.entity';
import { Titulacion_tbl } from './entities/tbl_titulacion.entity';
import { Malla } from './entities/tbl_malla.entity';
import { ModalidadTitulacion } from './entities/tbl_modalida_titulacion.entity';
import { TitulacionCarreraMalla } from './entities/tbl_titulacion_carrera_malla.entity';
import { TitulacionDetalle } from './entities/titulacion_detalle.entity'; 
import { GlobalDominios } from '../biblioteca/entities/global_dominios.entity'; 


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuarioCarreraPrivilegios, Usuario, Carrera, RolUsuario, Rol, TitulacionDetalle, GlobalDominios,
      Titulacion_tbl, Malla, ModalidadTitulacion, TitulacionCarreraMalla 
    ]),
  ],
  controllers: [TitulacionController],
  providers: [TitulacionService],
})
export class TitulacionModule {}
