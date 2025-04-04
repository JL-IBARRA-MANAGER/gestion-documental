import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';


export class CreateProyectoDetalleDto {
  @IsNotEmpty()
  PRO_ID: number;

  @IsOptional()
  @IsString()
  DETP_COORDINADOR: string;

  @IsOptional()
  @IsString()
  DETP_ESCUELAS: string;

  @IsOptional()
  @IsString()
  DETP_LINEACION: string;

  @IsOptional()
  @IsString()
  DETP_DESCRIPCION: string;
}
