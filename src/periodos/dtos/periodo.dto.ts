import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class PeriodoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  PER_ID: number;

  @ApiProperty({ example: '2024' })
  @IsString()
  PER_ANO: string;

  @ApiProperty({ example: '1' })
  @IsString()
  PER_PERIODO: string;

  @ApiProperty({ example: '2024-01-01' })
  @IsString()
  PER_ULTIMO: string;
}
