import { ApiProperty } from '@nestjs/swagger';

export class UpdateConvocatoriaDto {
  CONV_ID: number;
  CONV_TITULO: string;
  CONV_NOMBRE: string;
  CONV_REVISTA: string;
  CONV_TEXTO: string;
  CONV_ESTADO: number;
}
