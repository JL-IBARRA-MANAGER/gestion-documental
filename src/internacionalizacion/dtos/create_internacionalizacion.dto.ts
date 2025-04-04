import { ApiProperty } from '@nestjs/swagger';

export class CreateInternacionalizacionDto {
  @ApiProperty()
  SEDE_ID: number;

  @ApiProperty()
  ICAR_ID: number;

  @ApiProperty()
  INTER_CONV_CODIGO: string;

  @ApiProperty()
  INTER_CONV_NOMBRE: string;

  @ApiProperty()
  INTER_CONTRAPARTE: string;

  @ApiProperty()
  PAI_ID: number;

  @ApiProperty()
  PTIP_ID: number;

  @ApiProperty()
  INTER_PAPELLIDO: string;

  @ApiProperty()
  INTER_PNOMBRE: string;

  @ApiProperty()
  INTER_ACTIVIDADES: string;

  @ApiProperty()
  INTER_FINICIO: string;

  @ApiProperty()
  INTER_FFIN: string;

  @ApiProperty()
  ARE_ID: number;

  @ApiProperty()
  FIN_ID: number;

  @ApiProperty()
  INTER_ADOCENCIA: string;

  @ApiProperty()
  INTER_AINVESTIGACION: string;

  @ApiProperty()
  INTER_AVINCULACION: string;

  @ApiProperty()
  INTER_AADMINISTRATIVO: string;

  @ApiProperty()
  INTER_AINTERNACIONALIZACION: string;

  @ApiProperty()
  INTER_INDICADOR_1: string;

  @ApiProperty()
  INTER_INDICADOR_2: string;

  @ApiProperty()
  INTER_INDICADOR_3: string;

  @ApiProperty()
  INTER_INDICADOR_4: string;

  @ApiProperty()
  INTER_INDICADOR_5: string;

  @ApiProperty()
  INTER_INDICADOR_6: string;

  @ApiProperty()
  INTER_INDICADOR_7: string;

  @ApiProperty()
  INTER_INDICADOR_8: string;

  @ApiProperty()
  INTER_INDICADOR_9: string;

  @ApiProperty()
  INTER_EVIDENCIA: string;

  @ApiProperty()
  INTER_ESTADO: number;
}
