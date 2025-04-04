import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProyectoImagenDto {
  @IsNotEmpty()
  PRO_ID: number;

  // Puedes agregar más validaciones si es necesario
}
