import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';  
import { IsString, IsNumber, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';  

export class CreateGlobalEstudiantesDto {  
  @ApiProperty({  
    description: 'Identificación del estudiante',  
    example: '1234567890',  
  })  
  @IsString()  
  @IsNotEmpty()  
  IDENTIFICACION: string;  
} 