import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUpdateGlobalPersonalDto {
  @IsString()
  @IsNotEmpty()
  LDOC_NOMBRE: string;

  @IsString()
  @IsNotEmpty()
  LDDOC_CEDULA: string;

  @IsString()
  @IsNotEmpty()
  LDOC_GENERO: string;

  @IsNumber()
  @IsNotEmpty()
  LDOC_ESTADO: number;
}
