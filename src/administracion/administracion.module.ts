// src/administracion/administracion.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministracionService } from './services/administracion.service';
import { AdministracionController } from './controllers/administracion.controller';


import { Usuario } from '../login/usuario.entity';
import { Rol } from './entities/rol.entity';
import { RolUsuario } from '../login/rol_usuario.entity';
import { RolRuta } from '../login/rol_ruta.entity';
import { Ruta } from '../login/ruta.entity';
import { UsuarioCarreraPrivilegios } from '../titulacion/entities/usuario_carrera_privilegios.entity';
import { MatrizGraduados } from './entities/matriz_graduados.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, RolUsuario, RolRuta, Ruta, Rol, UsuarioCarreraPrivilegios, MatrizGraduados])],
  controllers: [AdministracionController],
  providers: [AdministracionService],
})
export class AdministracionModule {}
