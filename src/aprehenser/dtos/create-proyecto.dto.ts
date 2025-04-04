// src/aprehenser/dtos/create-proyecto.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateProyectoDto {
  @ApiProperty({ example: 'Nombre del proyecto' })
  PRO_NOMBRE: string;

  @ApiProperty({ example: 1, description: 'ID de la convocatoria asociada' })
  CONV_ID: number; // Agregamos la propiedad CONV_ID

  @ApiProperty({ example: 1, description: '1: En marcha, 0: Finalizado', required: false })
  PRO_EN_MARCHA?: number = 1; // Valor por defecto para "En marcha"
}
