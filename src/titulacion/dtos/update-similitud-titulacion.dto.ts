// src/titulacion/dtos/update-similitud-titulacion.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateSimilitudTitulacionDto {
  @IsNotEmpty()
  TITU_ID: number;
}
