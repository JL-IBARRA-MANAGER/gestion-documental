import { ApiProperty } from '@nestjs/swagger';

export class UpdateLogoPuceDto {
  @ApiProperty({ example: 1 })
  PAG_ID: number;
}
