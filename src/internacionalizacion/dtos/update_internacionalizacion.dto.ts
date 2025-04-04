import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInternacionalizacionDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  SEDE_ID?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  ICAR_ID?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_CONV_CODIGO?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_CONV_NOMBRE?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_CONTRAPARTE?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  PAI_ID?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  PTIP_ID?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_PAPELLIDO?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_PNOMBRE?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_ACTIVIDADES?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_FINICIO?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_FFIN?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  ARE_ID?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  FIN_ID?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_ADOCENCIA?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_AINVESTIGACION?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_AVINCULACION?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_AADMINISTRATIVO?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_AINTERNACIONALIZACION?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_INDICADOR_1?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_INDICADOR_2?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_INDICADOR_3?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_INDICADOR_4?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_INDICADOR_5?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_INDICADOR_6?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_INDICADOR_7?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_INDICADOR_8?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_INDICADOR_9?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_EVIDENCIA?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  INTER_ESTADO?: number;
}
