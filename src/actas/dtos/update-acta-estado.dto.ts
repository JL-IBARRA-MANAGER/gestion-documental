import { ApiProperty } from '@nestjs/swagger';

export class UpdateActaEstadoDto {
  @ApiProperty({ example: 1 })
  estado: number;
}
