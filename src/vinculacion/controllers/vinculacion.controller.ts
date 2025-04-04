import { Controller, Get, Post, Query, Put, Body, Param, UploadedFile, UseInterceptors, Headers, HttpException, HttpStatus } from '@nestjs/common';



import { FileInterceptor } from '@nestjs/platform-express';
import { VinculacionService } from '../services/vinculacion.service';
import { CreateVinculacionConvenioDto } from '../dtos/create-vinculacion-convenio.dto';
import { CreateVinculacionPracticaDto } from '../dtos/create-vinculacion-practica.dto';

import { UpdatePracticasPlanDto } from '../dtos/update_practicas_plan.dto';  
import { UpdatePracticasResultadosDto } from '../dtos/update_practicas_resultados.dto';


import { CreateVinculacionPracticaEstudianteDto } from '../dtos/create-vinculacion-practica-estudiante.dto';

import { CreateAsistenciaEstudianteDto } from '../dtos/create-asistencia-estudiante.dto';

import { CreateSeguimientoDto } from '../dtos/create-practica-seguimiento.dto';  

import { ApiHeader, ApiOperation, ApiTags, ApiBody,  ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@ApiTags('Vinculacion')
@Controller('vinculacion')
export class VinculacionController {
  constructor(private readonly vinculacionService: VinculacionService) {}


  @Get('matriz-integral')
  @ApiOperation({ summary: 'Devuelve la matriz integral de las prácticas realizadas' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getMatrizIntegral(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.getMatrizIntegral();
  }


  @Get('convenios')
  @ApiOperation({ summary: 'Obtener convenios activos' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getActiveConvenios(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.findActiveConvenios();
  }

  @Post('convenios')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, callback) => {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.mimetype)) {
        return callback(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);
      }
      callback(null, true);
    },
  }))
  @ApiOperation({ summary: 'Crear un nuevo convenio' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')  // Indica que acepta multipart/form-data
  @ApiBody({
    description: 'Datos para crear un nuevo convenio con archivo',
    schema: {
      type: 'object',
      properties: {
        VINE_ID: { type: 'integer', example: 1, description: 'ID de la empresa vinculada' },
        VINCC_LINK: { type: 'string', example: 'http://example.com/link', description: 'Enlace del convenio (opcional)' },
        file: { type: 'string', format: 'binary', description: 'Archivo del convenio (PDF o DOC)' }
      }
    }
  })
  async createConvenio(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createDto: CreateVinculacionConvenioDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    // Verifica si el archivo es válido antes de continuar con la lógica de guardado
    if (!file) {
      throw new HttpException('File not provided or invalid file type', HttpStatus.BAD_REQUEST);
    }

    return this.vinculacionService.createConvenio(createDto, file);
  }


    @Put('convenios/:id')
    @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, callback) => {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.mimetype)) {
        return callback(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);
        }
        callback(null, true);
    },
    }))
    @ApiOperation({ summary: 'Actualizar un convenio existente' })
    @ApiHeader({ name: 'apikey', required: true })
    @ApiHeader({ name: 'apisecret', required: true })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
    description: 'Datos para actualizar un convenio existente con archivo',
    schema: {
        type: 'object',
        properties: {
        VINE_ID: { type: 'integer', example: 1, description: 'ID de la empresa vinculada (opcional)' },
        VINCC_LINK: { type: 'string', example: 'http://example.com/link', description: 'Enlace del convenio (opcional)' },
        file: { type: 'string', format: 'binary', description: 'Archivo del convenio (PDF o DOC) (opcional)' },
        },
    },
    })
    async updateConvenio(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
    @Body() updateDto: CreateVinculacionConvenioDto,
    @UploadedFile() file?: Express.Multer.File,
    ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.vinculacionService.updateConvenio(id, updateDto, file);
    }


  @Get('practica-por-usuario')
  @ApiOperation({ summary: 'Ver prácticas de las carreras asignadas al usuario' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'USU_ID', required: true, type: Number })
  async getPracticaPorUsuario(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('USU_ID') USU_ID: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.getPracticaPorUsuario(USU_ID);
  }



   @Get('practicas-por-carrera')
  @ApiOperation({ summary: 'Ver prácticas por carrera' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'idCarrera', required: true, type: String }) // Uso correcto de ApiQuery
  async verPracticasPorCarrera(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('idCarrera') idCarrera: string,  // Uso correcto de Query
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.findPracticasPorCarrera(idCarrera);
  }

  @Get('practicas-por-periodo')
  @ApiOperation({ summary: 'Ver prácticas por periodo para administración' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'idPeriodo', required: true, type: String }) // Uso correcto de ApiQuery
  async verPracticasPorPeriodo(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('idPeriodo') idPeriodo: string,  // Uso correcto de Query
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.findPracticasPorPeriodo(idPeriodo);
  }

  @Get('practicas-por-periodo-y-carrera')
  @ApiOperation({ summary: 'Ver prácticas por periodo y carrera' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'idPeriodo', required: true, type: String }) // Uso correcto de ApiQuery
  @ApiQuery({ name: 'idCarrera', required: true, type: String }) // Uso correcto de ApiQuery
  async verPracticasPorPeriodoYCarrera(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('idPeriodo') idPeriodo: string,  // Uso correcto de Query
    @Query('idCarrera') idCarrera: string,  // Uso correcto de Query
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.findPracticasPorPeriodoYCarrera(idPeriodo, idCarrera);
  }


  @Post('registro-practica-por-carrera')
  @ApiOperation({ summary: 'Registro de prácticas por carrera' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({  
    description: 'Registro de una práctica por carrera',  
    schema: {  
      type: 'object',  
      properties: {  
        CAR_ID: { type: 'string', example: '4' },  
        VINPT_ID: { type: 'string', example: '1' },  
        VINESP_ID: { type: 'string', example: '1' },  
        VINE_ID: { type: 'string', example: '1' },  
        VINP_FECHA_INICIO: { type: 'string', format: 'date', example: '2024-01-01' },  
        VINP_FECHA_FIN: { type: 'string', format: 'date', example: '2024-12-31' },  
        VINP_HORAS_PRACTICAS: { type: 'string', example: '120' },  
        VINP_CAMPO_AMP: { type: 'string', example: '3' },  
        VINP_CAMPO_ESP: { type: 'string', example: '6' },  
        VINP_CAMPO_DET: { type: 'string', example: '22' },  
        DOC_CEDULA: { type: 'string', example: '0401355912' },  
        SEDE_ID: { type: 'string', example: '3' },  
        VINP_ESTADO: { type: 'string', example: '1' },  
        PER_ID: { type: 'string', example: '119' },  
        VCPB_CODIGO: { type: 'string', example: 'ABC123' } // New Column  
      },  
    },  
  })
  async registrarPractica(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createPracticaDto: CreateVinculacionPracticaDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.createPractica(createPracticaDto);
  }

  @Post('agregar-estudiante-practica')
  @ApiOperation({ summary: 'Agregar un estudiante a una práctica' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({
    description: 'Datos para agregar un estudiante a una práctica',
    schema: {
        type: 'object',
        properties: {
        EST_CEDULA: { type: 'string', example: '1234567890' },
        VINP_ID: { type: 'string', example: '1' }
        }
    }
  })
  async agregarEstudianteAPractica(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() dto: CreateVinculacionPracticaEstudianteDto,
    ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.agregarEstudianteAPractica(dto);
  }


  @Get('estados-vinculacion-estudiantes')
  @ApiOperation({ summary: 'Listado de estados de vinculación de estudiantes' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async listarEstadosVinculacion(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.listarEstadosVinculacion();
  }

  //@Throttle(50, 60) // Limitar a 50 solicitudes por minuto en esta ruta
  @Get('buscar-practicas-por-estudiante')
  @ApiOperation({ summary: 'Buscar prácticas por estudiante' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'cedula', required: true, type: String })
  async buscarPracticasPorEstudiante(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('cedula') cedula: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.buscarPracticasPorEstudiante(cedula);
  }

  @Get('ver-estudiantes-por-practica')
  @ApiOperation({ summary: 'Ver estudiantes por práctica/vinculación' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'VINP_ID', required: true, type: String }) // Añadir el parámetro VINP_ID
  async verEstudiantesPorPractica(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('VINP_ID') VINP_ID: string,  // Uso correcto del Query para recibir VINP_ID
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.verEstudiantesPorPractica(VINP_ID);  // Llamar al servicio
  }

  @Put('actualizar-estado-practica/:VINPE_ID')
  @ApiOperation({ summary: 'Actualizar estado de la práctica/vinculación' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({
    description: 'Actualizar el estado de la práctica/vinculación',
    schema: {
      type: 'object',
      properties: {
        VINPE_ESTADO_PRACTICA: { type: 'string', example: '1' },  // El estado se recibe como string
      }
    }
  })
  async actualizarEstadoPractica(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('VINPE_ID') VINPE_ID: string,
    @Body() body: { VINPE_ESTADO_PRACTICA: string },
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.actualizarEstadoPractica(Number(VINPE_ID), Number(body.VINPE_ESTADO_PRACTICA));
  }

  @Put('cargar-archivo-practica/:VINPE_ID')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, callback) => {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.mimetype)) {
        return callback(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);
      }
      callback(null, true);
    },
  }))
  @ApiOperation({ summary: 'Cargar archivo de práctica' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Cargar un archivo de práctica (PDF o DOC)',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary', description: 'Archivo del certificado de la práctica (PDF o DOC)' }
      }
    }
  })
  async cargarArchivoPractica(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('VINPE_ID') VINPE_ID: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.cargarArchivoPractica(Number(VINPE_ID), file);
  }


  @Get('escuela-carrera-por-cedula')
  @ApiOperation({ summary: 'Devuelve la Escuela y la carrera ingresando cédula del estudiante' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'cedula', required: true, type: String })
  async escuelaCarreraPorCedula(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('cedula') cedula: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionService.escuelaCarreraPorCedula(cedula);
  }


  @Get('vinculacion-programa-codigo-banner')  
  @ApiOperation({ summary: 'Devuelve por USU_ID todos los programas con su respectivo código ya sea de tecnología, grado o postgrado.' })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  @ApiQuery({ name: 'USU_ID', required: true, type: Number })  
  async getVinculacionProgramaCodigoBanner(  
    @Headers('apikey') apiKey: string,  
    @Headers('apisecret') apiSecret: string,  
    @Query('USU_ID') USU_ID: number,  
  ) {  
    // Validación de API keys  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
    }  

    // Llamada al servicio para obtener los datos  
    return this.vinculacionService.getVinculacionProgramaCodigoBanner(USU_ID);  
  }



  @Post('registro-asistencia-estudiante')  
  @ApiOperation({ summary: 'Registro de la asistencia de un estudiante a una práctica, por un tutor' })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  @ApiBody({  
    description: 'Datos del registro de asistencia del estudiante',  
    type: CreateAsistenciaEstudianteDto,  
  })  
  async registrarAsistenciaEstudiante(  
    @Headers('apikey') apiKey: string,  
    @Headers('apisecret') apiSecret: string,  
    @Body() createAsistenciaEstudianteDto: CreateAsistenciaEstudianteDto,  
  ) {  
    // Validar la API key y el secret  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
    }  

    // Manejo de valores opcionales  
    const asistenciaData = {  
      ...createAsistenciaEstudianteDto,  
      VINPR_FECHA_ENTRADA: createAsistenciaEstudianteDto.VINPR_FECHA_ENTRADA || null,  
      VINPR_FECHA_SALIDA: createAsistenciaEstudianteDto.VINPR_FECHA_SALIDA || null,  
    };  

    // Llamar al servicio para registrar la asistencia  
    return this.vinculacionService.createAsistenciaEstudiante(asistenciaData);  
  }

  @Get('registro-asistencia-estudiante')  
  @ApiOperation({ summary: 'Muestra el registro de asistencia a la práctica de un estudiante' })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  @ApiQuery({ name: 'VINPE_ID', required: true, description: 'Identificador de la práctica estudiante' })  
  async obtenerRegistroAsistenciaEstudiante(  
    @Headers('apikey') apiKey: string,  
    @Headers('apisecret') apiSecret: string,  
    @Query('VINPE_ID') VINPE_ID: number,  
  ) {  
    // Validación de API key y API secret  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
    }  

    // Llamada al servicio para traer los datos  
    return this.vinculacionService.obtenerRegistroAsistenciaPorEstudiante(VINPE_ID);  
  }  



  @Post('registro-practica-seguimiento')  
  @UseInterceptors(FileInterceptor('VINPES_RESPALDO', {  
    fileFilter: (req, file, callback) => {  
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];  
      if (!allowedTypes.includes(file.mimetype)) {  
        return callback(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);  
      }  
      callback(null, true);  
    },  
  }))  
  @ApiOperation({ summary: 'Registro del seguimiento y evaluación de una práctica' })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  @ApiConsumes('multipart/form-data')  
  @ApiBody({  
    description: 'Datos del seguimiento de la práctica y archivo de respaldo',  
    schema: {  
      type: 'object',  
      properties: {  
        VINPE_ID: { type: 'integer', example: 5 },  
        VINPES_FECHA_REGISTRO: { type: 'string', example: '2024-11-28 10:00:00' },  
        VINPES_OBSERVACION: { type: 'string', example: 'Trabajo satisfactorio' },  
        VINPES_RESPALDO: { type: 'string', format: 'binary' },  
      },  
    },  
  })  
  async registrarPracticaSeguimiento(  
    @Headers('apikey') apiKey: string,  
    @Headers('apisecret') apiSecret: string,  
    @Body() createSeguimientoDto: CreateSeguimientoDto,  
    @UploadedFile() file: Express.Multer.File,  
  ) {  
    // Verifica API key y secret  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
    }  

    // Verifica el archivo cargado  
    if (!file) {  
      throw new HttpException('File not provided or invalid file type', HttpStatus.BAD_REQUEST);  
    }  

    // Opcional: valida datos adicionales que no vengan del DTO  
    if (isNaN(createSeguimientoDto.VINPE_ID)) {  
      throw new HttpException('VINPE_ID must be a valid number', HttpStatus.BAD_REQUEST);  
    }  

    // Procesa la información en el servicio  
    return this.vinculacionService.registrarPracticaSeguimiento(createSeguimientoDto, file);  
  }


  @Put('practicas-plan')  
  @UseInterceptors(FileInterceptor('VINP_PLAN', {  
    fileFilter: (req, file, callback) => {  
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];  
      if (!allowedTypes.includes(file.mimetype)) {  
        callback(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);  
      } else {  
        callback(null, true);  
      }  
    },  
  }))  
  @ApiOperation({ summary: 'Agrega un plan a una práctica' })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  @ApiConsumes('multipart/form-data')  
  @ApiBody({  
    description: 'Cargar el plan asociado a una práctica',  
    schema: {  
      type: 'object',  
      properties: {  
        VINP_ID: { type: 'integer', example: 1 },  
        VINP_PLAN: { type: 'string', format: 'binary' },  
      },  
    },  
  })  
  async updatePracticaPlan(  
    @Headers('apikey') apiKey: string,  
    @Headers('apisecret') apiSecret: string,  
    @Body() dto: UpdatePracticasPlanDto,  
    @UploadedFile() file: Express.Multer.File,  
  ) {  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
    }  

    return this.vinculacionService.updatePracticaPlan(dto, file);  
  }  



  @Put('practicas-resultados')  
  @UseInterceptors(FileInterceptor('VINP_RESULTADOS', {  
    fileFilter: (req, file, callback) => {  
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];  
      if (!allowedTypes.includes(file.mimetype)) {  
        callback(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);  
      } else {  
        callback(null, true);  
      }  
    },  
  }))  
  @ApiOperation({ summary: 'Agrega los resultados a una práctica' })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  @ApiConsumes('multipart/form-data')  
  @ApiBody({  
    description: 'Cargar los resultados asociados a una práctica',  
    schema: {  
      type: 'object',  
      properties: {  
        VINP_ID: { type: 'integer', example: 1 },  
        VINP_RESULTADOS: { type: 'string', format: 'binary' },  
      },  
    },  
  })  
  async updatePracticaResultados(  
    @Headers('apikey') apiKey: string,  
    @Headers('apisecret') apiSecret: string,  
    @Body() dto: UpdatePracticasResultadosDto,  
    @UploadedFile() file: Express.Multer.File,  
  ) {  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
    }  

    return this.vinculacionService.updatePracticaResultados(dto, file);  
  }


  @Get('practica-empresa')  
  @ApiOperation({ summary: 'Obtiene todas las prácticas por empresa' })  
  @ApiHeader({ name: 'apikey', required: true, description: 'Clave de API para autenticación' })  
  @ApiHeader({ name: 'apisecret', required: true, description: 'Clave secreta de API para autenticación' })  
  @ApiQuery({ name: 'VINE_ID', required: true, description: 'ID de la empresa para obtener prácticas' })  
  async getPracticasPorEmpresa(  
    @Headers('apikey') apiKey: string,  
    @Headers('apisecret') apiSecret: string,  
    @Query('VINE_ID') vineId: number,  
  ) {  
    // Validación de API key y secret  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API Key or Secret', HttpStatus.UNAUTHORIZED);  
    }  

    // Llamar al servicio VinculacionService  
    return this.vinculacionService.getPracticasPorEmpresa(vineId);  
  } 


}
