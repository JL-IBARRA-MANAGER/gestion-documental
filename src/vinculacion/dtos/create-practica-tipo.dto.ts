// src/vinculacion/dtos/create-practica-tipo.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreatePracticaTipoDto {
  @ApiProperty({ description: 'Nombre del tipo de práctica' })
  VINPT_NOMBRE: string;
}
