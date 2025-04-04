import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVinculacionPracticaEstudianteDto {
  @ApiProperty({ example: '1234567890' })
  @IsString()
  @IsNotEmpty()
  EST_CEDULA: string;

  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  VINP_ID: string;

  // Puedes agregar más propiedades aquí si es necesario
}
