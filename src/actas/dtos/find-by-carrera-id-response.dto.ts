import { ApiProperty } from '@nestjs/swagger';
import { Acta } from '../entities/acta.entity';

export class FindByCarreraIdResponseDto {
  @ApiProperty({ type: [Acta] })
  actas: Acta[];

  @ApiProperty({ example: 'dominio.com' })
  dominio: string;

  @ApiProperty({ example: 'Descripcion del dominio' })
  descripcion: string;
}
