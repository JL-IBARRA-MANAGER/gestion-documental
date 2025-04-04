import { ApiProperty } from '@nestjs/swagger';  
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';  
import { Transform } from 'class-transformer';  

export class CreateSeguimientoDto {  
  @ApiProperty({ example: 5, description: 'ID de la práctica estudiante' })  
  @IsNotEmpty()  
  @Transform(({ value }) => parseInt(value, 10)) // Transformar a número  
  @IsNumber() // Validar que sea un número  
  VINPE_ID: number;  

  @ApiProperty({ example: '2024-11-28 10:00:00', description: 'Fecha y hora del registro' })  
  @IsNotEmpty()  
  @IsString() // Tratar como cadena  
  VINPES_FECHA_REGISTRO: string;  

  @ApiProperty({ example: 'Trabajo satisfactorio', description: 'Observaciones del seguimiento' })  
  @IsNotEmpty()  
  @IsString() // Tratar como cadena  
  VINPES_OBSERVACION: string;  
}