import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateClasificacionDocumentalDto {
  @ApiProperty({ description: 'ID de la subunidad académica' })
  @IsInt()
  @IsNotEmpty()
  GSUA_ID: number;

  @ApiProperty({ description: 'Serie documental' })
  @IsString()
  @IsNotEmpty()
  CGCD_SERIE_DOCUMENTAL: string;

  @ApiProperty({ description: 'Subserie documental' })
  @IsString()
  @IsNotEmpty()
  CGCD_SUBSERIE_DOCUMENTAL: string;

  @ApiProperty({ description: 'Descripción de la serie' })
  @IsString()
  @IsNotEmpty()
  CGCD_DESCRIPCION_SERIE: string;

  @ApiProperty({ description: 'Origen de la documentación (1: Física, 2: Electrónica, 3: Digital, 4: Híbrido)' })
  @IsInt()
  @IsNotEmpty()
  CGCD_ORIGEN_DOCUMENTACION: number;

  @ApiProperty({ description: 'Condiciones de acceso (1: Público, 2: Confidencial, 3: Reservado)' })
  @IsInt()
  @IsNotEmpty()
  CGCD_CONDICIONES_ACCESO: number;

  @ApiProperty({ description: 'Número de expedientes relacionados' })
  @IsInt()
  @IsOptional()
  CGCD_NUM_EXPEDIENTES?: number;
}
