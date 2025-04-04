import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipanteDto {
  PRO_ID: number;
  PPRO_NOMBRE: string;
  PPRO_TIPO_PARTICIPANTE: number;
}
