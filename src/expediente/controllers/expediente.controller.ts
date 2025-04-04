import { Controller, Get, Post, Put, Delete, Body, Param, Logger, UploadedFile, UploadedFiles, UseInterceptors,  Headers, HttpException, HttpStatus } from '@nestjs/common';
import { ExpedienteService } from '../services/expediente.service';
import { CreateExpedienteAcademicoDto } from '../dtos/create-expediente_academico.dto';
import { UpdateExpedienteAcademicoDto } from '../dtos/update-expediente_academico.dto';
import { DeleteExpedienteDetalleDto } from '../dtos/delete-expediente_detalle.dto';
import { FileInterceptor,  FilesInterceptor } from '@nestjs/platform-express';
import { ApiHeader, ApiOperation, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';


@ApiTags('Expediente')
@Controller('expediente')
export class ExpedienteController {

  private readonly logger = new Logger(ExpedienteController.name);

  constructor(private readonly expedienteService: ExpedienteService) {}

  @Get('academico')
  @ApiOperation({ summary: 'Obtener expediente académico' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getExpediente(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.expedienteService.findAll();
  }

  @Get('academico/:identificacion/:idPeriodo')
  @ApiOperation({ summary: 'Obtener expediente academico por identificacion y idPeriodo' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getByIdentificacionAndPeriod(
    @Param('identificacion') identificacion: string,
    @Param('idPeriodo') idPeriodo: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.expedienteService.findByIdentificacionAndPeriod(identificacion, idPeriodo);
  }

  @Get('cedula/:cedula')
  async getByCedula(
    @Param('cedula') cedula: string,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    this.logger.log(`Cédula recibida: ${cedula}`);  // Registra el valor de cédula recibido

    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      this.logger.warn('Clave API o secreto inválido');  // Registra una advertencia
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    const result = await this.expedienteService.findByCedula(cedula);
    this.logger.log(`Resultado de la consulta: ${JSON.stringify(result)}`);  // Registra los resultados
    return result;
  }




  @Get('academico/periodos/:idUsuario/:idPeriodo')
  @ApiOperation({ summary: 'Obtener expediente académico por usuario y periodo' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getByUserAndPeriod(
    @Param('idUsuario') idUsuario: number,
    @Param('idPeriodo') idPeriodo: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.expedienteService.findByUserAndPeriod(idUsuario, idPeriodo);
  }

  @Get('detalle/:idExpediente')
  @ApiOperation({ summary: 'Obtener detalles de expediente por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getExpedienteDetalleById(
    @Param('idExpediente') idExpediente: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    this.logger.log(`ID de expediente recibido: ${idExpediente}`);

    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      this.logger.warn('Clave API o secreto inválido');
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    const result = await this.expedienteService.findExpedienteDetalleById(idExpediente);
    this.logger.log(`Resultado de la consulta: ${JSON.stringify(result)}`);
    return result;
  }


  @Post('academico')
  @ApiOperation({ summary: 'Ingresar expediente académico' })
  async createExpediente(@Body() createExpedienteDto: CreateExpedienteAcademicoDto) {
    return this.expedienteService.create(createExpedienteDto);
  }

  @Put('academico/:id')
  @ApiOperation({ summary: 'Actualizar expediente académico' })
  async updateExpediente(@Param('id') id: number, @Body() updateExpedienteDto: UpdateExpedienteAcademicoDto) {
    return this.expedienteService.update(id, updateExpedienteDto);
  }

  @Get('tramites')
  @ApiOperation({ summary: 'Obtener tipos de trámite' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getTramites(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.expedienteService.findTramiteTypes();
  }

  @Post('academico-detalle')  
  @ApiOperation({ summary: 'Agregar un nuevo expediente académico detalle con archivo' })  
  @ApiConsumes('multipart/form-data')  
  @ApiBody({  
    description: 'Datos para agregar un nuevo detalle al expediente académico, incluyendo el archivo',  
    schema: {  
      type: 'object',  
      properties: {  
        EXPA_ID: { type: 'integer', example: 1 },  
        EXPAD_DETALLE: { type: 'string', example: 'Detalle del expediente' },  
        file: {  
          type: 'string',  
          format: 'binary',  
        },  
      },  
    },  
  })  
  @UseInterceptors(FileInterceptor('file', {  
    fileFilter: (req, file, cb) => {  
      console.log('Archivo recibido:', {  
        originalName: file.originalname,  
        mimetype: file.mimetype  
      });  

      const allowedMimeTypes = [  
        'application/pdf',  
        'application/msword', // .doc  
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx  
        'application/vnd.ms-excel', // .xls  
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx  
        'image/png',  
        'image/jpeg',  
        'image/jpg'  
      ];  

      if (allowedMimeTypes.includes(file.mimetype)) {  
        cb(null, true);  
      } else {  
        console.error('Tipo de archivo no permitido:', file.mimetype);  
        cb(new HttpException(`Tipo de archivo no permitido: ${file.mimetype}`, HttpStatus.BAD_REQUEST), false);  
      }  
    },  
    limits: {   
      fileSize: 100 * 1024 * 1024, // 100MB   
      files: 1   
    },  
  }))  
  async addExpedienteDetalle(  
    @Headers('apikey') apiKey: string,  
    @Headers('apisecret') apiSecret: string,  
    @Body() body: any,  
    @UploadedFile() file: Express.Multer.File,  
  ) {  
    try {  
      // Logging adicional  
      console.log('Detalles de la solicitud:', {  
        body,  
        fileInfo: file ? {  
          originalname: file.originalname,  
          mimetype: file.mimetype,  
          size: file.size  
        } : 'No file'  
      });  

      if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
      }  

      const { EXPA_ID, EXPAD_DETALLE, generatedFileName } = body;  

      if (!file) {  
        throw new HttpException('File not provided', HttpStatus.BAD_REQUEST);  
      }  

      // Llama al servicio pasando los 4 argumentos  
      return this.expedienteService.createExpedienteDetalle(EXPA_ID, EXPAD_DETALLE, generatedFileName, file);  
    } catch (error) {  
      console.error('Error completo en addExpedienteDetalle:', error);  
      throw new HttpException(  
        `Error procesando archivo: ${error.message}`,   
        HttpStatus.INTERNAL_SERVER_ERROR  
      );  
    }  
  }  



  @Delete('detalle/:EXPAD_ID')
  @ApiOperation({ summary: 'Elimina el detalle de un expediente por EXPAD_ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async deleteExpedienteDetalle(
    @Param('EXPAD_ID') EXPAD_ID: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.expedienteService.deleteExpedienteDetalle(EXPAD_ID);
  }

  @Post('academico-historico')  
  @ApiOperation({ summary: 'Agregar expedientes históricos con múltiples archivos' })  
  @ApiConsumes('multipart/form-data')  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  @ApiBody({  
    schema: {  
      type: 'object',  
      properties: {  
        EXPA_ID: { type: 'integer', example: 70 },  
        files: { type: 'array', items: { type: 'string', format: 'binary' } },  
      },  
    },  
  })  
  @UseInterceptors(FilesInterceptor('files', 12, {  
    fileFilter: (req, file, cb) => {  
      const allowedMimeTypes = [  
        'application/pdf',  
        'application/msword', // .doc  
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx  
        'application/vnd.ms-excel', // .xls  
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx  
        'image/png',  
        'image/jpeg',  
        'image/jpg'  
      ];  

      if (allowedMimeTypes.includes(file.mimetype)) {  
        cb(null, true);  
      } else {  
        cb(new HttpException(`Tipo de archivo no permitido: ${file.mimetype}`, HttpStatus.BAD_REQUEST), false);  
      }  
    },  
    limits: {   
      fileSize: 100 * 1024 * 1024, // 100MB por archivo  
      files: 10 // Máximo 10 archivos  
    },  
  }))  
  async addExpedientesHistoricos(  
    @Headers('apikey') apiKey: string,  
    @Headers('apisecret') apiSecret: string,  
    @Body('EXPA_ID') EXPA_ID: number,  
    @UploadedFiles() files: Express.Multer.File[],  
  ) {  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
    }  

    if (!files || files.length === 0) {  
      throw new HttpException('No files provided', HttpStatus.BAD_REQUEST);  
    }  

    return this.expedienteService.addExpedientesHistoricos(EXPA_ID, files);  
  }  


  @Get('seguimiento-carreras-estudiantes/:perID')  
  @ApiOperation({ summary: 'Obtener seguimiento de cantidad de estudiantes por carrera para un periodo' })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  async getEstudiantesPorCarrera(  
    @Param('perID') perID: number,  
    @Headers('apikey') apiKey: string,  
    @Headers('apisecret') apiSecret: string,  
  ) {  
    // Validación de API Key  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
    }  

    return this.expedienteService.getEstudiantesPorCarrera(perID);  
  }   


  @Get('seguimiento-periodo-estudiantes')  
  @ApiOperation({ summary: 'Devuelve los periodos con la cantidad de estudiantes registrados por periodo' })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  async getSeguimientoPeriodoEstudiantes(  
    @Headers('apikey') apiKey: string,   
    @Headers('apisecret') apiSecret: string  
  ) {  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
    }  
    return this.expedienteService.seguimientoPeriodoEstudiantes();  
  }  


}
