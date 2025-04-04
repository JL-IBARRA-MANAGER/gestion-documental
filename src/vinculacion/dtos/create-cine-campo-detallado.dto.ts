import { ApiProperty } from '@nestjs/swagger';

export class CreateCineCampoDetalladoDto {
  @ApiProperty({ description: 'ID del campo específico' })
  VCCE_ID: number;

  @ApiProperty({ description: 'Código del campo detallado' })
  VCCD_CODIGO: string;

  @ApiProperty({ description: 'Descripción del campo detallado' })
  VCCD_DESCRIPCION: string;
}
