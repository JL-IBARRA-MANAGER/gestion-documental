import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateTitulacionDetalleDto {
  @ApiProperty({ description: 'ID de titulación', example: 1 })
  @IsInt()
  TITU_ID: number;

  @ApiProperty({ description: 'ID de modalidad de titulación', example: 2 })
  @IsInt()
  MODTD_ID: number;

  @ApiProperty({ description: 'Tema de titulación', example: 'Tema de ejemplo' })
  @IsString()
  TITUD_TEMA: string;

  @ApiProperty({ description: 'Cédula del docente', example: '1234567890' })
  @IsString()
  TITUD_CEDULA_DOCENTE: string;

  @ApiProperty({ description: 'Nombre del docente', example: 'Docente Ejemplo' })
  @IsString()
  TITUD_DOCENTE: string;

  @ApiProperty({ description: 'ID del tipo de titulación', example: 1 })
  @IsInt()
  TIPO_ID: number;

  @ApiProperty({ description: 'Nota informativa', example: '85' })
  @IsString()
  TITUD_NOTA_INF: string;

  @ApiProperty({ description: 'Respaldo informativo (opcional)', example: 'path/to/file.pdf', required: false })
  @IsOptional()
  @IsString()
  TITUD_RESPALDO_INF?: string;
}
