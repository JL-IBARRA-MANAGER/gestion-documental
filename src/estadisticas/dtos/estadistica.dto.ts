// src/estadisticas/dtos/estadistica.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class EstadisticaDto {
  @IsNotEmpty()
  MAGR_NUMERO: number;

  @IsNotEmpty()
  @IsString()
  MAGR_CODDIGO_CARRERA: string;

  // ... Continúa con el resto de los campos según sea necesario ...
}
