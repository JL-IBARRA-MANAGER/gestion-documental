import { Controller, Get, Param, Headers, HttpException, HttpStatus, Post, Body, UploadedFile, UseInterceptors, Put,  Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GestionArchivoService } from '../services/gestion_archivo.service'
import { ApiHeader, ApiOperation, ApiTags, ApiBody,  ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { CreateClasificacionDocumentalDto } from '../dtos/create_clasificacion_documental.dto';
import { CreateDatoExpedienteDto } from '../dtos/create_dato_expediente.dto';
import { UpdateCuadroGeneralDto } from '../dtos/update-cuadro-general.dto'; 

import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';


@ApiTags('GestionArchivo')
@Controller('gestion-archivo')
export class GestionArchivoController {
  constructor(private readonly gestionArchivoService: GestionArchivoService) {}

  @Get('usuario_unidades_academicas_admin/:idUsuario/:idGAEO')
  @ApiOperation({ summary: 'Obtener Unidades Académicas Administrativas' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getUnidadesAcademicasAdmin(
    @Param('idUsuario') idUsuario: number,
    @Param('idGAEO') idGAEO: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.gestionArchivoService.getUnidadesAcademicasAdmin(idUsuario, idGAEO);
  }

    @Get('usuario_subunidades_academicas_admin/:idUsuario/:idGUAA')
    @ApiOperation({ summary: 'Obtener Subunidades Académicas Administrativas' })
    @ApiHeader({ name: 'apikey', required: true })
    @ApiHeader({ name: 'apisecret', required: true })
    async getSubUnidadesAcademicasAdmin(
        @Param('idUsuario') idUsuario: number,
        @Param('idGUAA') idGUAA: number,
        @Headers('apikey') apiKey: string,
        @Headers('apisecret') apiSecret: string,
    ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.gestionArchivoService.getSubUnidadesAcademicasAdmin(idUsuario, idGUAA);
    }

  @Get('cuadro_general/:idSubUnidad')
  @ApiOperation({ summary: 'Obtener Cuadro General por Subunidad' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getCuadroGeneral(
    @Param('idSubUnidad') idSubUnidad: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.gestionArchivoService.getCuadroGeneral(idSubUnidad);
  }

  @Get('usuario_estructura_organizacional/:idUsuario')
  @ApiOperation({ summary: 'Obtener Estructura Organizacional por Usuario' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getEstructuraOrganizacional(
    @Param('idUsuario') idUsuario: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.gestionArchivoService.getEstructuraOrganizacional(idUsuario);
  }

  @Get('cuadro_general_item/:idCuadroGeneral')
  @ApiOperation({ summary: 'Obtener Item del Cuadro General' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getCuadroGeneralItem(
    @Param('idCuadroGeneral') idCuadroGeneral: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.gestionArchivoService.getCuadroGeneralItem(idCuadroGeneral);
  }


  

  

  @Put('cuadro_general_item/:idCuadroGeneral')
  @ApiOperation({ summary: 'Actualiza los datos del Cuadro General seleccionado por idCuadroGeneral' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async actualizarCuadroGeneral(
    @Param('idCuadroGeneral') idCuadroGeneral: number,
    @Body() updateData: UpdateCuadroGeneralDto, // Usar el DTO aquí
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.gestionArchivoService.actualizarCuadroGeneral(idCuadroGeneral, updateData);
  }


  @Delete('cuadro_general_item/:CGCD_ID')
  @ApiOperation({ summary: 'Eliminar item de cuadro general' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async deleteCuadroGeneralItem(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('CGCD_ID') CGCD_ID: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.gestionArchivoService.deleteCuadroGeneralItem(CGCD_ID);
  }


  @Get('dato_expediente/:idCuadroGeneral')
  @ApiOperation({ summary: 'Obtener Datos del Expediente con dominio y descripción' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getDatoExpediente(
    @Param('idCuadroGeneral') idCuadroGeneral: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.gestionArchivoService.getDatoExpediente(idCuadroGeneral);
  }

  @Delete('dato_expediente/:GDE_ID')
  @ApiOperation({ summary: 'Eliminar un expediente' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async deleteDatoExpediente(
        @Param('GDE_ID') GDE_ID: number,
        @Headers('apikey') apiKey: string,
        @Headers('apisecret') apiSecret: string,
  ) {
        if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
            throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
        }
        return this.gestionArchivoService.deleteDatoExpediente(GDE_ID);
  }



  @Post('insertar_clasificacion_documental')
  @ApiOperation({ summary: 'Insertar Clasificación Documental' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async insertarClasificacionDocumental(
    @Body() createClasificacionDocumentalDto: CreateClasificacionDocumentalDto,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.gestionArchivoService.insertarClasificacionDocumental(createClasificacionDocumentalDto);
  }


  @Post('insertar_dato_expediente')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Insertar Dato del Expediente' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
      @ApiBody({
            description: 'Insertar datos del expediente y un archivo',
            schema: {
            type: 'object',
            properties: {
            CGCD_ID: { 
                  type: 'number',
                  example: 7 // Aquí defines el ejemplo que se verá en Swagger
            },
            GDE_NUM_EXPEDIENTE: { 
                  type: 'string',
                  example: 'SG002' // Ejemplo que se verá en Swagger
            },
            GDE_FECHA_APERTURA: { 
                  type: 'string', 
                  format: 'date',
                  example: '2024-04-01' // Ejemplo que se verá en Swagger
            },
            GDE_FECHA_CIERRE: { 
                  type: 'string', 
                  format: 'date', 
                  nullable: true,
                  example: '2024-04-30' // Ejemplo opcional
            },
            GDE_VALOR_DOCUMENTAL: { 
                  type: 'string',
                  example: '2' // Ejemplo que se verá en Swagger
            },
            GDE_CONDICIONES_ACCESO: { 
                  type: 'number',
                  example: 3 // Ejemplo que se verá en Swagger
            },
            GDE_PLAZO_CONSERVACION: { 
                  type: 'string',
                  example: '1' // Ejemplo que se verá en Swagger
            },
            GDE_DESTINO_FINAL_CONSERVACION: { 
                  type: 'string', 
                  nullable: true,
                  example: '26' // Ejemplo opcional
            },
            GDE_DESTINO_FINAL_ELIMINACION: { 
                  type: 'string', 
                  nullable: true,
                  example: '2' // Ejemplo opcional
            },
            GDE_CAJA: { 
                  type: 'string', 
                  nullable: true,
                  example: '' // Ejemplo vacío
            },
            file: { 
                  type: 'string', 
                  format: 'binary',
                  description: 'Archivo (PDF o DOC)' // No se muestra un ejemplo para archivos
            }
            },
            },
      })
    async insertarDatoExpediente(
    @Body() createDatoExpedienteDto: CreateDatoExpedienteDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.gestionArchivoService.insertarDatoExpediente(createDatoExpedienteDto, file);
  }

  @Put('actualizar_dato_expediente/:GDE_ID')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Actualizar Dato del Expediente' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Actualizar datos del expediente y opcionalmente reemplazar el archivo',
    schema: {
      type: 'object',
      properties: {
        GDE_NUM_EXPEDIENTE: { type: 'string' },
        GDE_FECHA_APERTURA: { type: 'string', format: 'date' },
        GDE_FECHA_CIERRE: { type: 'string', format: 'date', nullable: true },
        GDE_VALOR_DOCUMENTAL: { type: 'string' },
        GDE_CONDICIONES_ACCESO: { type: 'number' },
        GDE_PLAZO_CONSERVACION: { type: 'string' },
        GDE_DESTINO_FINAL_CONSERVACION: { type: 'string', nullable: true },
        GDE_DESTINO_FINAL_ELIMINACION: { type: 'string', nullable: true },
        GDE_CAJA: { type: 'string', nullable: true },
        file: { type: 'string', format: 'binary', description: 'Archivo (opcional)' }
      },
    },
  })
  async actualizarDatoExpediente(
    @Param('GDE_ID') GDE_ID: number,
    @Body() updateDatoExpedienteDto: CreateDatoExpedienteDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.gestionArchivoService.actualizarDatoExpediente(GDE_ID, updateDatoExpedienteDto, file);
  }


  @Get('reporte-inventario/:GSUA_ID')
  @ApiOperation({ summary: 'Reporte de inventario, todos los expedientes por clasificación documental' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getReporteInventario(
    @Param('GSUA_ID') GSUA_ID: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.gestionArchivoService.getReporteInventario(GSUA_ID);
  }



}
