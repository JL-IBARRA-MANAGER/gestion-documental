import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioEstadoDto {
  @ApiProperty({ example: 1, description: 'Nuevo estado del usuario (1 para activo, 0 para inactivo)' })
  @IsInt()
  @IsNotEmpty()
  estado: number;
}
