import { IsString } from 'class-validator';

export class UpdateSedeNombreDto {
  @IsString()
  SEDE_NOMBRE: string;
}