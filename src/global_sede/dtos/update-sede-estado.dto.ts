import { IsNumber } from 'class-validator';

export class UpdateSedeEstadoDto {
  @IsNumber()
  SEDE_ESTADO: number;
}
