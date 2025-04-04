import { ApiPropertyOptional } from '@nestjs/swagger';  
import { IsOptional, IsString, IsEmail, IsInt } from 'class-validator';  

export class UpdateVinculacionEmpresaDto {  
  @ApiPropertyOptional({ description: 'ID de la empresa' })  
  @IsOptional()  
  @IsInt()  
  VINE_ID?: number;  

  @ApiPropertyOptional({ description: 'Nombre de la empresa' })  
  @IsOptional()  
  @IsString()  
  VINE_NOMBRE?: string;  

  @ApiPropertyOptional({ description: 'Teléfono de la empresa' })  
  @IsOptional()  
  @IsString()  
  VINE_TELEFONO?: string;  

  @ApiPropertyOptional({ description: 'Correo de la empresa' })  
  @IsOptional()  
  @IsEmail()  
  VINE_CORREO?: string;  

  @ApiPropertyOptional({ description: 'Contacto de la empresa' })  
  @IsOptional()  
  @IsString()  
  VINE_CONTACTO?: string;  

  @ApiPropertyOptional({ description: 'Identificación del contacto' })  
  @IsOptional()  
  @IsString()  
  VINE_IDENTIFICACION?: string;  

  @ApiPropertyOptional({ description: 'ID del tipo de empresa' })  
  @IsOptional()  
  @IsInt()  
  VINET_ID?: number;  

  @ApiPropertyOptional({  
    description: 'Sector económico de la empresa: 1 - Primario, 2 - Secundario, 3 - Terciario',  
  })  
  @IsOptional()  
  @IsInt()  
  VINE_SECTOR_ECONOMICO?: number;  

  @ApiPropertyOptional({ description: 'Código de banner de la empresa' })  
  @IsOptional()  
  @IsString()  
  VINE_CODIGO_BANNER?: string;  

  @ApiPropertyOptional({ description: 'ID de la parroquia' })  
  @IsOptional()  
  @IsInt()  
  VINE_ID_PARROQUIA?: number;  

  @ApiPropertyOptional({ description: 'Dirección de la empresa' })  
  @IsOptional()  
  @IsString()  
  VINE_DIRECCION?: string;  
}  