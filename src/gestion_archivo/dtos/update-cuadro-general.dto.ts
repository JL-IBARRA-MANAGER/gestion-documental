// src/gestion_archivo/dtos/update-cuadro-general.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class UpdateCuadroGeneralDto {
  @ApiProperty({ description: 'Serie Documental' })
  @IsString()
  CGCD_SERIE_DOCUMENTAL: string;

  @ApiProperty({ description: 'Subserie Documental' })
  @IsString()
  CGCD_SUBSERIE_DOCUMENTAL: string;

  @ApiProperty({ description: 'Descripción de la Serie' })
  @IsString()
  CGCD_DESCRIPCION_SERIE: string;

  @ApiProperty({ description: 'Origen de Documentación' })
  @IsInt()
  CGCD_ORIGEN_DOCUMENTACION: number;

  @ApiProperty({ description: 'Condiciones de Acceso' })
  @IsInt()
  CGCD_CONDICIONES_ACCESO: number;
}
