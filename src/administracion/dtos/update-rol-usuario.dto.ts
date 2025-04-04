import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolUsuarioDto {
  @ApiProperty({ example: 1, description: 'ID del Rol' })
  @IsInt()
  @IsNotEmpty()
  rolId: number;

  @ApiProperty({ example: 1, description: 'Estado del Rol del Usuario (1 para activo, 0 para inactivo)' })
  @IsInt()
  @IsNotEmpty()
  estado: number;
}
