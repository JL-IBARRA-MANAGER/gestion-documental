// delete-expediente_detalle.dto.ts
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteExpedienteDetalleDto {
  @ApiProperty({ example: 1, description: 'ID del detalle de expediente a eliminar' })
  @IsInt()
  EXPAD_ID: number;
}
