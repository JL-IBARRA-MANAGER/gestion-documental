// src/administracion/dtos/create-usuario.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'Juan' })
  USU_NOMBRE: string;

  @ApiProperty({ example: 'Pérez' })
  USU_APELLIDO: string;

  @ApiProperty({ example: 'jperez' })
  USU_USUARIO: string;

  @ApiProperty({ example: '1234567890', description: 'Cédula del usuario, se usará como contraseña' })
  Cedula: string;
}
