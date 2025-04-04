import { Controller, Get, Post, Put, Body, Headers, HttpException, HttpStatus, Query, UploadedFiles, UploadedFile, UseInterceptors } from '@nestjs/common'; 
import { TitulacionService } from '../services/titulacion.service';
import { CreateTitulacionDto } from '../dtos/create-titulacion.dto';
import { RegistroNotasTrabajoDto } from '../dtos/registro-notas-trabajo.dto';
import { UpdateSimilitudTitulacionDto } from '../dtos/update-similitud-titulacion.dto';

import { ApiHeader, ApiOperation, ApiTags, ApiQuery, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'; // Para manejar los archivos
import * as multer from 'multer';

@ApiTags('Titulacion')
@Controller('titulacion')
export class TitulacionController {
  constructor(private readonly titulacionService: TitulacionService) {}


  @Get('titulacion_usuario_carrera_privilegios')
  @ApiOperation({ summary: 'Obtener privilegios de carrera de titulacion por usuario' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'usuId', required: true, type: Number })
  async getTitulacionPrivilegios(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('usuId') usuId: number,  
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.titulacionService.findTitulacionPrivilegios(usuId);
  }

  @Get('titulacion_por_carrera')
  @ApiOperation({ summary: 'Obtener titulaciones por carrera' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'idCarrera', required: true, type: Number })
  async getTitulacionPorCarrera(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('idCarrera') idCarrera: number,  // Asegúrate de que Query esté importado
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.titulacionService.findTitulacionByCarreraId(idCarrera);
  }

  @Get('mallas_por_carrera_y_modalidad')
  @ApiOperation({ summary: 'Obtener mallas por carrera y modalidad' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'idCarrera', required: true, type: Number })
  @ApiQuery({ name: 'idModalidad', required: true, type: Number })
  async getMallasPorCarrera(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('idCarrera') idCarrera: number, 
    @Query('idModalidad') idModalidad: number, 
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.titulacionService.findMallaByCarreraId(idCarrera, idModalidad);
  }

  @Get('modalidades')
  @ApiOperation({ summary: 'Obtener modalidades de titulación activas' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getModalidades(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.titulacionService.findModalidades();
  }

  @Get('titulos_por_carrera')
  @ApiOperation({ summary: 'Obtener títulos por carrera' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'idCarrera', required: true, type: Number })
  async getCarreraTitulos(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('idCarrera') idCarrera: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.titulacionService.findTitulosByCarreraId(idCarrera);
  }

  @Get('modalidades_titulacion_por_modalidad_y_malla')
  @ApiOperation({ summary: 'Devuelve los tipos de modalidad de titulación por modalidad y malla' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'idModalidadTitulacion', required: true, type: Number })
  @ApiQuery({ name: 'idMalla', required: true, type: Number })
  async getModalidadesTitulacionByModalidadYMalla(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('idModalidadTitulacion') idModalidadTitulacion: number,
    @Query('idMalla') idMalla: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.titulacionService.findModalidadesTitulacionByModalidadYMalla(idModalidadTitulacion, idMalla);
  }


  @Post('crear_titulacion')
  @ApiOperation({ summary: 'Crear una nueva titulacion' })
  async createTitulacion(
    @Body() createTitulacionDto: CreateTitulacionDto,
  ) {
    return this.titulacionService.createTitulacion(createTitulacionDto);
  }

  

  @Get('tipo-docentes-titulacion')
  @ApiOperation({ summary: 'Tipo de docentes de titulación Asesor, lector 1, lector 2 o tribunal' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getTipoDocentesTitulacion(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.titulacionService.getTipoDocentesTitulacion();
  }

  @Get('tipo-docentes-titulacion-modalidad')
  @ApiOperation({ summary: 'Tipo de docentes por modalidad de titulación' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'MODT_ID', required: true, type: Number })
  async getTipoDocentesTitulacionModalidad(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('MODT_ID') MODT_ID: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.titulacionService.getTipoDocentesTitulacionModalidad(MODT_ID);
  }


  @Post('registro-notas-trabajo-curricular')
  @ApiOperation({ summary: 'Registro de notas trabajo de titulación / integración curricular' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Registro de notas de trabajo de titulación con la opción de cargar un archivo',
    schema: {
      type: 'object',
      properties: {
        TITU_ID: { type: 'string', example: '2' },
        MODTD_ID: { type: 'string', example: '3' },
        TITUD_TEMA: { type: 'string', example: 'Lincenciado en contabilidad de prueba' },
        TITUD_CEDULA_DOCENTE: { type: 'string', example: '1002003001' },
        TITUD_DOCENTE: { type: 'string', example: 'Juanito Chavez' },
        TIPO_ID: { type: 'string', example: '1' },
        TITUD_NOTA_INF: { type: 'string', example: '30' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // Límite de 50MB por archivo
  }))
  async registroNotasTrabajoCurricular(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() dto: RegistroNotasTrabajoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    return this.titulacionService.registroNotasTrabajoCurricular(dto, file);
  }



  @Post('documento-similitus-titulacion')
  @ApiOperation({ summary: 'Agregar documento de similitud de tesis' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Agregar documento de similitud de tesis con el archivo correspondiente',
    schema: {
      type: 'object',
      properties: {
        TITU_ID: { type: 'number', example: 1 },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // Límite de 50MB por archivo
  }))
  async agregarDocumentoSimilitud(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateSimilitudDto: UpdateSimilitudTitulacionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    return this.titulacionService.agregarDocumentoSimilitud(updateSimilitudDto, file);
  }


  @Put('documento-similitud-titulacion')
  @ApiOperation({ summary: 'Actualiza el documento de similitud' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Actualiza el documento de similitud para una titulación existente',
    schema: {
      type: 'object',
      properties: {
        TITU_ID: { type: 'number', example: 1 },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // Límite de 50MB por archivo
  }))
  async updateDocumentoSimilitud(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateSimilitudDto: UpdateSimilitudTitulacionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    return this.titulacionService.updateDocumentoSimilitud(updateSimilitudDto, file);
  }



}