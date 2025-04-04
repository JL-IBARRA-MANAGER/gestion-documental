import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVinculacionEmpresaEstadoDto {
  @ApiProperty({ example: 1, description: '1: Activo, 0: Inactivo' })
  @IsInt()
  @IsNotEmpty()
  estado: number;
}
