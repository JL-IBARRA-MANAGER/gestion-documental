// create-acta.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateActaDto {
  @ApiProperty({ example: 1 })
  carreraId: number;

  @ApiProperty({ example: '2024-08-17' })
  fecha: Date;

  @ApiProperty({ example: 'observacion' })
  observacion: string;

  @ApiProperty({ example: 'Orden de la reunión', description: 'Orden del acta' })
  orden: string;

  @ApiProperty({ example: 'convocatoria' })
  convocatoria: string;

  @ApiProperty({ example: 1, description: 'Tipo de acta', type: 'number' }) 
  tipo: number;  
}
