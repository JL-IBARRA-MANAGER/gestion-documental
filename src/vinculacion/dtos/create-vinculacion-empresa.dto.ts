import { IsOptional, IsString, IsEmail, IsInt } from 'class-validator';  
import { ApiPropertyOptional } from '@nestjs/swagger';  

export class CreateVinculacionEmpresaDto {  
  @ApiPropertyOptional({ example: 'Empresa XYZ' })  
  @IsOptional()  
  @IsString()  
  VINE_NOMBRE?: string;  

  @ApiPropertyOptional({ example: '0999999999' })  
  @IsOptional()  
  @IsString()  
  VINE_TELEFONO?: string;  

  @ApiPropertyOptional({ example: 'contacto@empresa.com' })  
  @IsOptional()  
  @IsEmail()  
  VINE_CORREO?: string;  

  @ApiPropertyOptional({ example: 'Juan P�rez' })  
  @IsOptional()  
  @IsString()  
  VINE_CONTACTO?: string;  

  @ApiPropertyOptional({ example: '0102030405', description: 'N�mero de identificaci�n de la empresa' })  
  @IsOptional()  
  @IsString()  
  VINE_IDENTIFICACION?: string;  

  @ApiPropertyOptional({ example: 1 })  
  @IsOptional()  
  @IsInt()  
  VINET_ID?: number;  

  @ApiPropertyOptional({ example: 2, description: '1: Primario, 2: Secundario, 3: Terciario' })  
  @IsOptional()  
  @IsInt()  
  VINE_SECTOR_ECONOMICO?: number;  

  @ApiPropertyOptional({ example: 'BANNER001', description: 'C�digo de banner de la empresa' })  
  @IsOptional()  
  @IsString()  
  VINE_CODIGO_BANNER?: string;  

  @ApiPropertyOptional({ example: 123, description: 'ID de la parroquia' })  
  @IsOptional()  
  @IsInt()  
  VINE_ID_PARROQUIA?: number;  

  @ApiPropertyOptional({ example: 'Av. Ejemplo 123 y Calle Principal', description: 'Direcci�n de la empresa' })  
  @IsOptional()  
  @IsString()  
  VINE_DIRECCION?: string;  

  @ApiPropertyOptional({   
    example: 'Descripci�n detallada de la empresa',   
    description: 'Descripci�n de la empresa',  
    maxLength: 500   
  })  
  @IsOptional()  
  @IsString()  
  VINE_DESCRIPCION?: string;  

}  