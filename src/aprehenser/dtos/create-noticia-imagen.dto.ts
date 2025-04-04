import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticiaImagenDto {
  @IsNotEmpty()
  @IsNumber()
  PAGN_ID: number;
}
