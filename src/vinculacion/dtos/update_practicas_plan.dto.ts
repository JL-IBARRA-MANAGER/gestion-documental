// src/vinculacion/dtos/update_practicas_plan.dto.ts  
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';  
import { Transform } from 'class-transformer';  

export class UpdatePracticasPlanDto {  
  @IsNotEmpty()  
  @IsNumber()  
  @Transform(({ value }) => parseInt(value, 10)) // Convierte el valor a número  
  VINP_ID: number;  

  @IsOptional()  
  @IsString()  
  VINP_PLAN: string;  
}  