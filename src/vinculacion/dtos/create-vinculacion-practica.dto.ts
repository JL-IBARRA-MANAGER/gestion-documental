import { IsNotEmpty, IsString } from 'class-validator';  
import { ApiProperty } from '@nestjs/swagger';  

export class CreateVinculacionPracticaDto {  
  @ApiProperty({ example: '1', description: 'ID de la carrera' })  
  @IsNotEmpty()  
  CAR_ID: string;  

  @ApiProperty({ example: '2', description: 'ID del tipo de práctica' })  
  @IsNotEmpty()  
  VINPT_ID: string;  

  @ApiProperty({ example: '3', description: 'ID de la especificación de práctica' })  
  @IsNotEmpty()  
  VINESP_ID: string;  

  @ApiProperty({ example: '4', description: 'ID de la empresa vinculada' })  
  @IsNotEmpty()  
  VINE_ID: string;  

  @ApiProperty({ example: '2024-01-01', description: 'Fecha de inicio de la práctica' })  
  @IsNotEmpty()  
  VINP_FECHA_INICIO: string;  

  @ApiProperty({ example: '2024-12-31', description: 'Fecha de fin de la práctica' })  
  @IsNotEmpty()  
  VINP_FECHA_FIN: string;  

  @ApiProperty({ example: '120', description: 'Horas de práctica' })  
  @IsNotEmpty()  
  VINP_HORAS_PRACTICAS: string;  

  @ApiProperty({ example: 'Campo Específico', description: 'Campo específico de la práctica' })  
  @IsNotEmpty()  
  VINP_CAMPO_ESP: string;  

  @ApiProperty({ example: 'Campo Detallado', description: 'Campo detallado de la práctica' })  
  @IsNotEmpty()  
  VINP_CAMPO_DET: string;  

  @ApiProperty({ example: '0123456789', description: 'Cédula del docente responsable' })  
  @IsNotEmpty()  
  DOC_CEDULA: string;  

  @ApiProperty({ example: '5', description: 'ID de la sede donde se realiza la práctica' })  
  @IsNotEmpty()  
  SEDE_ID: string;  

  @ApiProperty({ example: '1', description: 'Estado de la práctica' })  
  @IsNotEmpty()  
  VINP_ESTADO: string;  

  @ApiProperty({ example: 'Campo Amplio', description: 'Campo amplio de la práctica' })  
  @IsNotEmpty()  
  VINP_CAMPO_AMP: string;  

  @ApiProperty({ example: '6', description: 'ID del periodo' })  
  @IsNotEmpty()  
  PER_ID: string;  

  @ApiProperty({ example: 'ABC123', description: 'Código vinculación de la práctica' }) 
  @IsNotEmpty()  
  @IsString()  
  VCPB_CODIGO: string;  

  @ApiProperty({   
    example: 'Práctica de Desarrollo Web',   
    description: 'Nombre de la práctica'   
  })  
  @IsNotEmpty()  
  @IsString()  
  VINP_NOMBRE_PRACTICA: string;  

  @ApiProperty({   
    example: '10',   
    description: 'Número de cupos disponibles para la práctica'   
  })  
  @IsNotEmpty()  
  VINP_CUPOS_PRACTICA: string; 

}