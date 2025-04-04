import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateActaArchivoDto {
  @ApiProperty({ example: '1', description: 'ID de la carrera (enviado como texto)' })
  @IsString()  // Cambiado a string
  @IsNotEmpty()
  carreraId: string;  // Ahora es string para permitir la entrada como texto

  @ApiProperty({ example: '2024-09-01', description: 'Fecha del acta (enviado como texto)' })
  @IsString()
  @IsNotEmpty()
  fecha: string;  // Ahora es string

  @ApiProperty({ example: 'Observación de la reunión', description: 'Observación del acta' })
  @IsString()
  @IsNotEmpty()
  observacion: string;

  @ApiProperty({ example: 'Orden del acta', description: 'Orden del acta' })
  @IsString()
  @IsNotEmpty()
  orden: string;

  @ApiProperty({ example: '1', description: 'Tipo de acta (enviado como texto)' })
  @IsString()  // Cambiado a string
  @IsNotEmpty()
  tipo: string;  // Ahora es string
}
