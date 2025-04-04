import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistroNotasTrabajoDto {
  @ApiProperty({ example: '2', description: 'ID de la titulación', type: String })
  @IsString()
  TITU_ID: string;

  @ApiProperty({ example: '3', description: 'ID de la modalidad de titulación', type: String })
  @IsString()
  MODTD_ID: string;

  @ApiProperty({ example: 'Lincenciado en contabilidad de prueba', description: 'Tema de la titulación', type: String })
  @IsString()
  TITUD_TEMA: string;

  @ApiProperty({ example: '1002003001', description: 'Cédula del docente', type: String })
  @IsString()
  TITUD_CEDULA_DOCENTE: string;

  @ApiProperty({ example: 'Juanito Chavez', description: 'Nombre del docente', type: String })
  @IsString()
  TITUD_DOCENTE: string;

  @ApiProperty({ example: '1', description: 'ID del tipo de trabajo de titulación', type: String })
  @IsString()
  TIPO_ID: string;

  @ApiProperty({ example: '30', description: 'Nota del informe', type: String })
  @IsString()
  TITUD_NOTA_INF: string;
}
