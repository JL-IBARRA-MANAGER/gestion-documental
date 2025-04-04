import { ApiProperty } from '@nestjs/swagger';

export class UpdateProyectoDetalleDto {
  @ApiProperty({ example: 1, description: 'ID del detalle del proyecto', required: true })
  DETP_ID: number;

  @ApiProperty({ example: 'Juan Perez', description: 'Coordinador del proyecto', required: false })
  DETP_COORDINADOR?: string;

  @ApiProperty({ example: 'Escuela de Ciencias', description: 'Escuela del proyecto', required: false })
  DETP_ESCUELAS?: string;

  @ApiProperty({ example: 'Lineación estratégica', description: 'Lineación del proyecto', required: false })
  DETP_LINEACION?: string;

  @ApiProperty({ example: 'Descripción del proyecto', description: 'Descripción del proyecto', required: false })
  DETP_DESCRIPCION?: string;

  @ApiProperty({ example: 'https://video.com', description: 'URL del video', required: false })
  DETP_VIDEO?: string;
}
