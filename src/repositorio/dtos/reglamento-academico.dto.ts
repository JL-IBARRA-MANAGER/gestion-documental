import { ApiProperty } from '@nestjs/swagger';

export class ReglamentoAcademicoDto {
  @ApiProperty({ description: 'ID del reglamento académico' })
  RRA_ID: number;

  @ApiProperty({ description: 'Fecha del reglamento académico' })
  Fecha: string;

  @ApiProperty({ description: 'Nombre del reglamento académico' })
  Nombre: string;

  @ApiProperty({ description: 'Observación del reglamento académico' })
  Observación: string;

  @ApiProperty({ description: 'Acción del reglamento académico' })
  Acción: string;
}
