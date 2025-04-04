// src/repository/dtos/update-reglamento-academico.dto.ts
import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReglamentoAcademicoDto {
  @ApiProperty({ example: "1" })
  @IsString()
  RRA_ID: string;

  @ApiProperty({ example: '2024-10-30' })
  @IsDateString()
  RRA_FECHA: string;

  @ApiProperty({ example: 'Nuevo Reglamento General' })
  @IsString()
  RRA_NOMBRE: string;

  @ApiProperty({ example: 'Observación actualizada' })
  @IsOptional()
  @IsString()
  RRA_OBSERVACION?: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Archivo del reglamento actualizado' })
  RRA_RUTA: any;
}
