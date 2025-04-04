import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RutasDto {
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID del rol del usuario' })
  rolId: number;
}
