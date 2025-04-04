// src/administracion/dtos/create-ruta.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRutaDto {
  @ApiProperty({ example: 'Ver titulación' })
  @IsString()
  @IsNotEmpty()
  nombreRuta: string;

  @ApiProperty({ example: 'ver-titulacion' })
  @IsString()
  @IsNotEmpty()
  rutRuta: string;

  @ApiProperty({ example: 9 })
  @IsNumber()
  idRutaPadre: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  datosParaAutocompletado: number;
}
