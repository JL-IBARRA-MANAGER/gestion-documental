
import { ApiProperty } from '@nestjs/swagger';


export class UpdateDesarrolloFormacionDto {
  DES_ID: number;
  DES_NOMBRE?: string;
  DES_TEXTO?: string;
}