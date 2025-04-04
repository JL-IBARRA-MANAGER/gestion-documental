import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateTitulacionDto {
  @ApiProperty()
  TITU_BIBLIOTECA_OBSERVACION: string;

  @ApiProperty()
  TITU_BIBLIOTECA: number;
}
