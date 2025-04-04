import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { Usuario } from './usuario.entity';
import { RolUsuario } from './rol_usuario.entity';
import { RolRuta } from './rol_ruta.entity';
import { Ruta } from './ruta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, RolUsuario, RolRuta, Ruta])
  ],
  providers: [LoginService],
  controllers: [LoginController],
  exports: [TypeOrmModule],
})
export class LoginModule {}
