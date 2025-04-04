// src/vinculacion/dtos/create-cine-campo-amplio.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateCineCampoAmplioDto {
  @ApiProperty({ description: 'Código CINE' })
  VCCA_CODIGO: string;

  @ApiProperty({ description: 'Descripción del campo amplio' })
  VCCA_DESCRIPCION: string;
}
