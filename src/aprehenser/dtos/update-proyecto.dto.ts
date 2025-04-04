import { ApiProperty } from '@nestjs/swagger';

export class UpdateProyectoDto {
  PRO_ID: number;
  PRO_NOMBRE: string;
  PRO_EN_MARCHA: number;
  PRO_ESTADO: number;
}
