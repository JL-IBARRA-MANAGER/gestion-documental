import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ActasService } from '../services/actas.service';
import { CreateActaDto } from '../dtos/create-acta.dto';
import { UpdateActaDto } from '../dtos/update-acta.dto';
import { UpdateActaEstadoDto } from '../dtos/update-acta-estado.dto';
import { CreateActaArchivoDto } from '../dtos/create-acta-archivo.dto'


@ApiTags('Actas')
@Controller('actas')
export class ActasController {
  constructor(private readonly actasService: ActasService) {}

  @Get('carrera/:idCarrera')
  @ApiOperation({ summary: 'Obtener actas por carrera' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getActasByCarrera(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('idCarrera') idCarrera: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.actasService.findByCarreraId(idCarrera);
  }

  @Get('acta/:idACTA')
  @ApiOperation({ summary: 'Obtener acta por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getActaById(
        @Headers('apikey') apiKey: string,
        @Headers('apisecret') apiSecret: string,
        @Param('idACTA') idACTA: number,
    ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.actasService.findById(idACTA);
  }

  @Put('estado/:id')
  @ApiOperation({ summary: 'Actualizar estado de un acta' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async updateActaEstado(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
    @Body() updateEstadoDto: UpdateActaEstadoDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.actasService.updateEstado(id, updateEstadoDto);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Crear una nueva acta' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({
    description: 'Datos para crear una nueva acta',
    schema: {
      type: 'object',
      properties: {
        carreraId: { type: 'integer', example: 1 },
        fecha: { type: 'string', example: '2024-08-17' },
        observacion: { type: 'string', example: 'Some observation' },
        orden: { type: 'integer', example: 1 },
        convocatoria: { type: 'string', example: 'Some convocatoria' },
        tipo: { type: 'string', example: 'Some tipo' },
      },
    },
  })
  async createActa(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createActaDto: CreateActaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    const filePath = `path/to/save/${file.filename}`;  // Modify this as per your file-saving logic
    return this.actasService.createActa(createActaDto, filePath);
  }


  @Post('crear-acta')
  @ApiOperation({ summary: 'Crear una nueva acta con el archivo Acta' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Crear una nueva acta con el archivo Acta',
    schema: {
      type: 'object',
      properties: {
        carreraId: { type: 'string', example: '1' },
        fecha: { type: 'string', example: '2024-09-09' },
        observacion: { type: 'string', example: 'Reunión ordinaria' },
        orden: { type: 'string', example: 'Orden de la reunión' },
        tipo: { type: 'string', example: '1' },
        Acta: { type: 'string', format: 'binary' },  // Archivo Acta
      },
    },
  })
  @UseInterceptors(FileInterceptor('Acta', {
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== 'application/pdf') {
        return cb(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);
      }
      cb(null, true);
    },
  }))
  async crearActaConActa(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createActaArchivoDto: CreateActaArchivoDto,
    @UploadedFile() actaFile: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    // Llama al servicio para subir el archivo y guardar los datos en la base de datos
    return this.actasService.createActaConArchivo(createActaArchivoDto, actaFile);
  }  



  // Método para actualizar una acta
  @Put('actualizar-acta/:id')
  @ApiOperation({ summary: 'Actualizar información de una acta con un archivo opcional' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Actualizar una acta con archivo opcional',
    schema: {
      type: 'object',
      properties: {
        fecha: { type: 'string', example: '2024-09-09' },
        observacion: { type: 'string', example: 'Reunión ordinaria' },
        orden: { type: 'string', example: 'Orden del acta' },
        Acta: { type: 'string', format: 'binary', description: 'Archivo Acta (opcional)' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('Acta', {
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== 'application/pdf') {
        return cb(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);
      }
      cb(null, true);
    },
  }))
  async actualizarActa(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
    @Body() updateActaDto: UpdateActaDto,
    @UploadedFile() actaFile: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    // Llamar al servicio para actualizar la acta y manejar el archivo si existe
    return this.actasService.updateActa(id, updateActaDto, actaFile);
  }


}
