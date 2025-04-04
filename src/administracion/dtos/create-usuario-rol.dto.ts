// src/administracion/dtos/create-usuario-rol.dto.ts
import { IsNumber } from 'class-validator';

export class CreateUsuarioRolDto {
  @IsNumber()
  ROL_ID: number;

  @IsNumber()
  USU_ID: number;
}
