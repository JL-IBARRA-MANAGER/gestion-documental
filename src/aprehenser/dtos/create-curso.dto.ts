// src/aprehenser/dtos/create-curso.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateCursoDto {
  @ApiProperty({ description: 'Tema del curso', example: 'Curso de programación' })
  @IsString()
  DESC_TEMA: string;

  @ApiProperty({ description: 'Duración del curso', example: '200 horas' })
  @IsString()
  DESC_DURACION: string;

  @ApiProperty({ description: 'Itinerario del curso', example: 'de 9:00 a 13:00' })
  @IsString()
  DESC_ITINERARIO: string;

  @ApiProperty({ description: 'Fecha de inicio del curso', example: '2023-01-01' })
  @IsDateString()
  DESC_FECHADESDE: string;

  @ApiProperty({ description: 'Fecha de finalización del curso', example: '2023-06-01' })
  @IsDateString()
  DESC_FECHAHASTA: string;

  @ApiProperty({ description: 'ID del ámbito', example: 1 })
  @IsString()
  AMB_ID: string;

  @ApiProperty({ description: 'ID del estado del curso', example: 2 })
  @IsString()
  EDC_ID: string;

  @ApiProperty({ description: 'Estado del curso (por defecto 1)', example: 1 })
  @IsOptional()
  @IsString()
  DESC_ESTADO: string = '1';

  @ApiProperty({ description: 'ID del tipo de curso', example: 1 })
  @IsString()
  TDC_ID: string;

  @ApiProperty({ description: 'Valor del curso', example: '50' })
  @IsString()
  DESC_VALOR: string;

  @ApiProperty({
    description: 'Contenido del curso',
    example: 'Descripción detallada del contenido...',
  })
  @IsString()
  DESC_CONTENIDO: string;
}
