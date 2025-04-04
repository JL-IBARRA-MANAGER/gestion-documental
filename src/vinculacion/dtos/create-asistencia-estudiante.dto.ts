import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';  
import { IsString, IsNumber, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';  

export class CreateAsistenciaEstudianteDto {  
  @ApiPropertyOptional({ example: '2024-11-28 08:00:00', description: 'Fecha y hora de entrada del estudiante a la práctica (opcional)' })  
  @IsOptional()  
  @IsDateString()  
  VINPR_FECHA_ENTRADA?: string;  

  @ApiPropertyOptional({ example: '2024-11-28 15:00:00', description: 'Fecha y hora de salida del estudiante de la práctica (opcional)' })  
  @IsOptional()  
  @IsDateString()  
  VINPR_FECHA_SALIDA?: string;  

  @ApiProperty({ example: 'Observación sobre la asistencia', description: 'Observaciones del tutor sobre la asistencia del estudiante' })  
  @IsNotEmpty()  
  @IsString()  
  VINPR_OBSERVACION: string;  

  @ApiProperty({ example: 25, description: 'ID del usuario (estudiante)' })  
  @IsNotEmpty()  
  @IsNumber()  
  USU_ID: number;  

  @ApiProperty({ example: 5, description: 'ID de la práctica estudiante (VINPE_ID)' })  
  @IsNotEmpty()  
  @IsNumber()  
  VINPE_ID: number;  
}