import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateDatoExpedienteDto {
  @ApiProperty({ example: '7', description: 'ID del cuadro general de clasificación documental' })
  @IsString()
  @IsOptional()
  CGCD_ID: string;

  @ApiProperty({ example: 'SG002', description: 'Número de expediente' })
  @IsString()
  @IsNotEmpty()
  GDE_NUM_EXPEDIENTE: string;

  @ApiProperty({ example: '2024-04-01', description: 'Fecha de apertura' })
  @IsDateString()
  @IsNotEmpty()
  GDE_FECHA_APERTURA: string;

  @ApiProperty({ example: '2024-04-30', description: 'Fecha de cierre', required: false })
  @IsDateString()
  @IsOptional()
  GDE_FECHA_CIERRE?: string;

  @ApiProperty({ example: '2', description: 'Valor documental' })
  @IsString()
  @IsNotEmpty()
  GDE_VALOR_DOCUMENTAL: string;

  @ApiProperty({ example: '3', description: 'Condiciones de acceso' })
  @IsString()
  @IsNotEmpty()
  GDE_CONDICIONES_ACCESO: string;

  @ApiProperty({ example: '1', description: 'Plazo de conservación' })
  @IsString()
  @IsNotEmpty()
  GDE_PLAZO_CONSERVACION: string;

  @ApiProperty({ example: '26', description: 'Destino final para conservación', required: false })
  @IsString()
  @IsOptional()
  GDE_DESTINO_FINAL_CONSERVACION?: string;

  @ApiProperty({ example: '2', description: 'Destino final para eliminación', required: false })
  @IsString()
  @IsOptional()
  GDE_DESTINO_FINAL_ELIMINACION?: string;

  @ApiProperty({ example: '', description: 'Número de caja', required: false })
  @IsString()
  @IsOptional()
  GDE_CAJA?: string;

  @ApiProperty({ example: 'archivo.pdf', description: 'Ruta del archivo', required: false })
  @IsString()
  @IsOptional()
  GDE_ARCHIVO?: string;
}
