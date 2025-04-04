// dtos/update-acta.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class UpdateActaDto {
  @ApiProperty({ example: '2024-09-09', description: 'Fecha del acta' })
  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @ApiProperty({ example: 'Reunión ordinaria', description: 'Observación del acta' })
  @IsString()
  @IsNotEmpty()
  observacion: string;

  @ApiProperty({ example: 'Orden del acta', description: 'Orden del acta' })
  @IsString()
  @IsNotEmpty()
  orden: string;
}
