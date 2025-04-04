import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateExpedienteAcademicoDto {
  @ApiProperty({ example: '1234567890' })
  @IsString()
  EXPA_IDENTIFICACION: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  EXPTT_ID: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  PER_ID: number;

  @ApiProperty({ example: 'Observación' })
  @IsString()
  EXPA_OBSERVACION: string;

  @ApiProperty({ example: 58 })
  @IsInt()
  CAR_ID: number;


}
