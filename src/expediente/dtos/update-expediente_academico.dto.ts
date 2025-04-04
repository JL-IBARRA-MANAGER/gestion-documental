import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UpdateExpedienteAcademicoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  EXPA_ESTADO: number;
}
