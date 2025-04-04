// src/repository/dtos/create-reglamento-academico.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateReglamentoAcademicoDto {
  @ApiProperty({ example: '2024-10-30', description: 'Fecha del reglamento' })
  RRA_FECHA: string;

  @ApiProperty({ example: 'Reglamento General', description: 'Nombre del reglamento' })
  RRA_NOMBRE: string;

  @ApiProperty({ example: 'Este es el reglamento oficial', description: 'Observaciones del reglamento' })
  RRA_OBSERVACION: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Archivo del reglamento' })
  RRA_RUTA: any;  // El archivo cargado
}
