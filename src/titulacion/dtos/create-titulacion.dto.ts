import { ApiProperty } from '@nestjs/swagger'; // Swagger para documentación
import { IsOptional, IsString, IsInt } from 'class-validator'; // Validación

export class CreateTitulacionDto {
  @ApiProperty({ description: 'Cedula del estudiante', example: '0123456789' })
  @IsString()
  TITU_CEDULA: string;

  @ApiProperty({ description: 'Nombres del estudiante', example: 'Juan Pérez' })
  @IsString()
  TITU_NOMBRES: string;

  @ApiProperty({ description: 'ID de la carrera', example: 1 })
  @IsInt()
  CAR_ID: number;

  @ApiProperty({ description: 'ID de la modalidad de titulacion', example: 2 })
  @IsInt()
  MODT_ID: number;

  @ApiProperty({ description: 'ID de la malla', example: 3 })
  @IsInt()
  MALLA_ID: number;

  @ApiProperty({ description: 'Titulo del estudiante', example: 'Licenciado en Ciencias' })
  @IsString()
  TITU_TITULO: string;

  @ApiProperty({ description: 'Registro de tutorías', example: 'Registro123' })
  @IsOptional()
  @IsString()
  TITU_REGISTRO_TUTORIAS: string;
}
