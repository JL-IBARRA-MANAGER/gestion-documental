import { IsString, IsEmail, IsNotEmpty, IsInt, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCursoRegistroDto {
  @IsInt()
  @IsNotEmpty()
  DESC_ID: number;

  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  REC_NOMBRES: string;

  @IsEmail()
  @IsNotEmpty()
  REC_CORREO: string;

  @IsString()
  @Length(10, 10)
  @IsNotEmpty()
  REC_CEDULA: string;

  @IsString()
  @Length(7, 15)
  @IsNotEmpty()
  REC_TELEFONO: string;
}
