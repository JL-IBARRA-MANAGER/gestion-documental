// src/alumni/alumni.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumniService } from './services/alumni.service';
import { AlumniController } from './controllers/alumni.controller';
import { UsuarioCarreraPrivilegios } from '../titulacion/entities/usuario_carrera_privilegios.entity';
import { Usuario } from '../titulacion/entities/usuario.entity';
import { Carrera } from '../titulacion/entities/carrera.entity';
import { Rol } from '../titulacion/entities/rol.entity';
import { RolUsuario } from '../titulacion/entities/rol_usuario.entity';
import { Titulacion_tbl } from '../titulacion/entities/tbl_titulacion.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UsuarioCarreraPrivilegios, Usuario, Carrera, Rol, RolUsuario, Titulacion_tbl])],
  controllers: [AlumniController],
  providers: [AlumniService],})
export class AlumniModule {}
