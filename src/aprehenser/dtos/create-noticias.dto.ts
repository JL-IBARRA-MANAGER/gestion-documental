// src/aprehenser/dtos/create-noticias.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoticiasDto {
  @IsNotEmpty()
  @IsString()
  PAGN_TITULO: string;

  @IsNotEmpty()
  @IsString()
  PAGN_TEXTO: string;

  @IsNotEmpty()
  @IsString()
  PAGN_AUTOR: string;
}
