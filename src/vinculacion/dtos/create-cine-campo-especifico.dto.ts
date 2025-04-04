import { ApiProperty } from '@nestjs/swagger';

export class CreateCineCampoEspecificoDto {
  @ApiProperty({ description: 'ID del campo amplio' })
  VCCA_ID: number;

  @ApiProperty({ description: 'Código del campo específico' })
  VCCE_CODIGO: string;

  @ApiProperty({ description: 'Descripción del campo específico' })
  VCCE_DESCRIPCION: string;
}
