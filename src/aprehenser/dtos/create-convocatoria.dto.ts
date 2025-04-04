import { ApiProperty } from '@nestjs/swagger';

export class CreateConvocatoriaDto {
  CONV_TITULO: string;
  CONV_NOMBRE: string;
  CONV_REVISTA: string;
  CONV_TEXTO: string;
}
