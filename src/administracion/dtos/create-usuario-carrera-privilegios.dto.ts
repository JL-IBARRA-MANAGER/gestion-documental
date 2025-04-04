import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateUsuarioCarreraPrivilegiosDto {
  @ApiProperty({ example: 1, description: 'ID del usuario' })
  @IsInt()
  USU_ID: number;

  @ApiProperty({ example: 2, description: 'ID de la carrera' })
  @IsInt()
  CAR_ID: number;

  @ApiProperty({ example: 1, description: 'Privilegio de titulación (1 para habilitado, 0 para deshabilitado)' })
  @IsInt()
  USUCP_TITULACION: number;

  @ApiProperty({ example: 1, description: 'Privilegio de edición (1 para habilitado, 0 para deshabilitado)' })
  @IsInt()
  USUCP_EDITAR: number;
}
