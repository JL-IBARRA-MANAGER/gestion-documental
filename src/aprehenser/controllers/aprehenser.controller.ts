import { Controller, Get,  Param, Put, Post, Delete, Body, Query, Headers, HttpException, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AprehenserService } from '../services/aprehenser.service';
import { UpdateLogoPuceDto } from '../dtos/update-pagina-web.dto';
import { CreateConvocatoriaDto } from '../dtos/create-convocatoria.dto';  
import { UpdateConvocatoriaDto } from '../dtos/update-convocatoria.dto';  

import { CreateProyectoDto } from '../dtos/create-proyecto.dto';
import { UpdateProyectoDto } from '../dtos/update-proyecto.dto';
import { UpdateProyectoDetalleDto } from '../dtos/update-proyecto-detalle.dto';
import { CreateParticipanteDto } from '../dtos/create-participante.dto';

import { CreateProyectoImagenDto } from '../dtos/create-proyecto-imagen.dto'; 

import { CreateProyectoDetalleDto } from '../dtos/create-proyecto-detalle.dto';

import { CreateNoticiasDto } from '../dtos/create-noticias.dto';

import { CreateNoticiaImagenDto } from '../dtos/create-noticia-imagen.dto';

import { UpdateDesarrolloFormacionDto } from '../dtos/update-desarrollo-formacion.dto';
import { UpdateCursoEstadoDto } from '../dtos/update-curso-estado.dto';
import { CreateCursoDto } from '../dtos/create-curso.dto';
import { CreateCursoRegistroDto } from '../dtos/create-curso-registro.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiHeader, ApiTags, ApiConsumes, ApiBody, ApiQuery  } from '@nestjs/swagger';

import { Express } from 'express'; // Para manejar los archivos
import * as multer from 'multer';


@ApiTags('Aprehenser')
@Controller('aprehenser')
export class AprehenserController {
  constructor(private readonly aprehenserService: AprehenserService) {}

  @Get('logo-puce')
  @ApiOperation({ summary: 'Obtener el logo de PUCE-I' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getLogoPuce(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getLogoPuce();
  }

  @Put('logo-puce')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Actualizar el logo de PUCE-I' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        PAG_ID: { type: 'integer', example: 1 },
        file: { type: 'string', format: 'binary' },  
      },
    },
  })
  async updateLogoPuce(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateLogoPuceDto: UpdateLogoPuceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    const { PAG_ID } = updateLogoPuceDto;
    return this.aprehenserService.updateLogoPuce(PAG_ID, file);
  }

  // Nuevo endpoint GET para obtener el logo de Aprehenser
  @Get('logo-aprehenser')
  @ApiOperation({ summary: 'Obtener el logo de Aprehenser' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getLogoAprehenser(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getLogoAprehenser();
  }

  // Nuevo endpoint PUT para actualizar el logo de Aprehenser
  @Put('logo-aprehenser')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Actualizar el logo de Aprehenser' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        PAG_ID: { type: 'integer', example: 1 },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  async updateLogoAprehenser(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateLogoPuceDto: UpdateLogoPuceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    const { PAG_ID } = updateLogoPuceDto;
    return this.aprehenserService.updateLogoAprehenser(PAG_ID, file);
  }


  // **Nuevo endpoint GET para obtener el texto del logo**
  @Get('logo-texto')
  @ApiOperation({ summary: 'Obtener el texto del logo' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getLogoTexto(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getLogoTexto();
  }


  // **Nuevo endpoint PUT para actualizar el texto del logo**
  @Put('logo-texto')
  @ApiOperation({ summary: 'Actualizar el texto del logo' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        PAG_ID: { type: 'integer', example: 1 },
        texto: { type: 'string', example: 'Nuevo texto del logo' },
      },
    },
  })
  async updateLogoTexto(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateLogoTextoDto: { PAG_ID: number; texto: string },
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    const { PAG_ID, texto } = updateLogoTextoDto;
    return this.aprehenserService.updateLogoTexto(PAG_ID, texto);
  }


  @Get('imagenes-banner')
  @ApiOperation({ summary: 'Imágenes disponibles en el banner' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getImagenesBanner(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getImagenesBanner();
  }

  // Nuevo endpoint PUT para actualizar la imagen del banner
  @Put('imagenes-banner')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Actualizar la imagen del banner' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        PWC_ID: { type: 'integer', example: 1 },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  async updateImagenBanner(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateImagenBannerDto: { PWC_ID: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    const { PWC_ID } = updateImagenBannerDto;
    return this.aprehenserService.updateImagenBanner(PWC_ID, file);
  }

  @Get('video')
  @ApiOperation({ summary: 'Video disponible en la página principal del sitio web' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getVideo(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getVideo();
  }

  @Put('video')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Actualizar video disponible en la página principal del sitio web' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        PAG_ID: { type: 'integer', example: 1 },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  async updateVideo(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateVideoDto: { PAG_ID: number },
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    const { PAG_ID } = updateVideoDto;
    return this.aprehenserService.updateVideo(PAG_ID, file);
  }

  @Get('nosotros')
  @ApiOperation({ summary: 'Texto sobre nosotros del footer del sitio web' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getNosotros(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getNosotros();
  }

  @Put('nosotros')
  @ApiOperation({ summary: 'Actualizar el texto sobre nosotros del footer del sitio web' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        PAG_ID: { type: 'integer', example: 1 },
        PAG_NOSOTROS: { type: 'string', example: 'Nuevo texto sobre nosotros' },
      },
    },
  })
  async updateNosotros(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateNosotrosDto: { PAG_ID: number; PAG_NOSOTROS: string },
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    const { PAG_ID, PAG_NOSOTROS } = updateNosotrosDto;
    return this.aprehenserService.updateNosotros(PAG_ID, PAG_NOSOTROS);
  }

//Proyectos

  // Nuevo endpoint GET para proyectos-convocatoria
  @Get('proyectos-convocatoria')
  @ApiOperation({ summary: 'Muestra el listado de convocatorias por edición con su detalle' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getProyectosConvocatoria(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getProyectosConvocatoria();
  }

  // Nuevo endpoint PUT para actualizar proyectos-convocatoria
  @Put('proyectos-convocatoria')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Modificar convocatorias o detalle' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        CONV_ID: { type: 'integer', example: 1 },
        CONV_TITULO: { type: 'string', example: 'Título de la Convocatoria' },
        CONV_NOMBRE: { type: 'string', example: 'Nombre de la Convocatoria' },
        file: { type: 'string', format: 'binary' },
        CONV_REVISTA: { type: 'string', example: 'Revista' },
        CONV_TEXTO: { type: 'string', example: 'Texto detallado' },
        CONV_ESTADO: { type: 'integer', example: 1 }
      },
    },
  })
  async updateProyectosConvocatoria(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateConvocatoriaDto: UpdateConvocatoriaDto,  // Usamos el DTO
    @UploadedFile() file: Express.Multer.File
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.updateProyectosConvocatoria(updateConvocatoriaDto, file);
  }

  // Nuevo endpoint POST para agregar proyectos-convocatoria
  @Post('proyectos-convocatoria')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Agrega convocatorias con detalle' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        CONV_TITULO: { type: 'string', example: 'Título de la Convocatoria' },
        CONV_NOMBRE: { type: 'string', example: 'Nombre de la Convocatoria' },
        file: { type: 'string', format: 'binary' },
        CONV_REVISTA: { type: 'string', example: 'Revista' },
        CONV_TEXTO: { type: 'string', example: 'Texto detallado' },
      },
    },
  })
  async createProyectosConvocatoria(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createConvocatoriaDto: CreateConvocatoriaDto,  // Usamos el DTO
    @UploadedFile() file: Express.Multer.File
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.createProyectosConvocatoria(createConvocatoriaDto, file);
  }



  // Nuevo endpoint GET para listar proyectos por convocatoria
  @Get('proyectos-convocatoria-listado')
  @ApiOperation({ summary: 'Muestra listado de proyectos por convocatorias seleccionada - CONV_ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getProyectosPorConvocatoria(
    @Headers('apikey') apiKey: string, 
    @Headers('apisecret') apiSecret: string,
    @Query('CONV_ID') convId: number
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getProyectosPorConvocatoria(convId);
  }


  @Post('proyectos-detalle')
  @UseInterceptors(FileInterceptor('file'))  // 'file' es el nombre del campo en el formulario
  @ApiOperation({ summary: 'Agrega un detalle a un proyecto' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        PRO_ID: { type: 'integer', example: 1 },
        DETP_COORDINADOR: { type: 'string', example: 'Juan Pérez' },
        DETP_ESCUELAS: { type: 'string', example: 'Escuela de Ciencias' },
        DETP_LINEACION: { type: 'string', example: 'Lineación estratégica' },
        DETP_DESCRIPCION: { type: 'string', example: 'Descripción del proyecto' },
        file: { type: 'string', format: 'binary' },  // Archivo a subir
      },
    },
  })
  async agregarDetalleProyecto(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createProyectoDetalleDto: CreateProyectoDetalleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    return this.aprehenserService.agregarProyectoDetalle(createProyectoDetalleDto, file);
  }



  // Nuevo endpoint GET para obtener el detalle de un proyecto
  @Get('proyectos-detalle')
  @ApiOperation({ summary: 'Detalle de un proyecto' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'PRO_ID', required: true, type: Number, description: 'ID del proyecto' }) // Agregar PRO_ID como query parameter en Swagger
  async getDetalleProyecto(
    @Headers('apikey') apiKey: string, 
    @Headers('apisecret') apiSecret: string,
    @Query('PRO_ID') proId: number // Cambiar @Body por @Query
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getDetalleProyecto(proId);
  }





  // Nuevo endpoint PUT para modificar un proyecto
  @Put('proyectos-convocatoria-listado')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Modificar proyecto' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        PRO_ID: { type: 'integer', example: 1 },
        PRO_NOMBRE: { type: 'string', example: 'Nombre del proyecto' },
        PRO_EN_MARCHA: { type: 'integer', example: 1, description: '1 es En marcha, 0 es Finalizado' },
        PRO_ESTADO: { type: 'integer', example: 1, description: '1 es Activo, 0 es Eliminado' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  async updateProyecto(
    @Headers('apikey') apiKey: string, 
    @Headers('apisecret') apiSecret: string,
    @Body() updateProyectoDto: UpdateProyectoDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.updateProyecto(updateProyectoDto, file);
  }

  // Nuevo endpoint POST para crear un proyecto
  @Post('proyectos-convocatoria-listado')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Agrega un proyecto a la convocatoria' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        PRO_NOMBRE: { type: 'string', example: 'Nombre del proyecto' },
        CONV_ID: { type: 'integer', example: 1, description: 'ID de la convocatoria' }, // Agregar CONV_ID
        file: { type: 'string', format: 'binary' }, // Para cargar el archivo
      },
    },
  })
  async createProyecto(
    @Headers('apikey') apiKey: string, 
    @Headers('apisecret') apiSecret: string,
    @Body() createProyectoDto: CreateProyectoDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.createProyecto(createProyectoDto, file);
  }



  @Put('proyectos-detalle')
  @UseInterceptors(FileInterceptor('DETP_VIDEO', {
    storage: multer.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 }, // Límite de 100MB para el video
  }))
  @ApiOperation({ summary: 'Actualizar el detalle de un proyecto, incluyendo la subida de video opcional' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        DETP_ID: { type: 'integer', example: 1, description: 'ID del detalle del proyecto' },
        DETP_COORDINADOR: { type: 'string', example: 'Juan Perez', description: 'Nombre del coordinador' },
        DETP_ESCUELAS: { type: 'string', example: 'Escuela de Ciencias', description: 'Escuela del proyecto' },
        DETP_LINEACION: { type: 'string', example: 'Lineación estratégica', description: 'Lineación del proyecto' },
        DETP_DESCRIPCION: { type: 'string', example: 'Descripción del proyecto', description: 'Descripción del proyecto' },
        DETP_VIDEO: { type: 'string', format: 'binary', description: 'Archivo de video del proyecto (opcional)' }
      },
    },
  })
  async updateProyectoDetalle(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateProyectoDetalleDto: UpdateProyectoDetalleDto,
    @UploadedFile() file: Express.Multer.File, // El archivo de video subido
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.aprehenserService.updateProyectoDetalle(updateProyectoDetalleDto, file);
  }


  // Nuevo endpoint POST para agregar un participante a un proyecto
  @Post('proyecto-detalle-participante')
  @ApiOperation({ summary: 'Agregar participantes a un proyecto' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        PRO_ID: { type: 'integer', example: 1 },
        PPRO_NOMBRE: { type: 'string', example: 'Juan Pérez' },
        PPRO_TIPO_PARTICIPANTE: { type: 'integer', example: 1 },  // 1 para docente, 2 para estudiante
      },
    },
  })
  async addParticipante(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createParticipanteDto: CreateParticipanteDto
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.aprehenserService.addParticipante(createParticipanteDto);
  }

  // Nuevo endpoint GET para mostrar el tipo de participantes disponibles
  @Get('proyecto-tipo-participante')
  @ApiOperation({ summary: 'Muestra el tipo de participantes disponibles, docente, estudiante, etc' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getTiposParticipantes(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.aprehenserService.getTiposParticipantes();
  }


  @Post('proyecto-detalle-fotos')
  @UseInterceptors(FileInterceptor('file'))  // 'file' es el nombre del campo en el formulario
  @ApiOperation({ summary: 'Agregar imágenes o fotos a un proyecto' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        PRO_ID: { type: 'integer', example: 1 }, // ID del proyecto
        file: { type: 'string', format: 'binary' }, // Archivo a subir
      },
    },
  })
  async agregarImagenProyecto(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createProyectoImagenDto: CreateProyectoImagenDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.agregarImagenProyecto(createProyectoImagenDto, file);
  }


  @Get('noticias')
  @ApiOperation({ summary: 'Muestra todas las noticias activas' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getNoticias(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
      if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
          throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
      }
      return this.aprehenserService.getNoticias();
  }

  @Get('noticias-desactivadas')
  @ApiOperation({ summary: 'Muestra todas las noticias desactivadas' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getNoticiasDesactivadas(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
      if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
          throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
      }
      return this.aprehenserService.getNoticiasDesactivadas();
  }

  
    
    @Post('noticias')
    @ApiOperation({ summary: 'Agregar una nueva noticia' })
    @ApiHeader({ name: 'apikey', required: true })
    @ApiHeader({ name: 'apisecret', required: true })
    @ApiBody({
    schema: {
        type: 'object',
        properties: {
        PAGN_TITULO: { type: 'string', example: 'Título de la noticia' },
        PAGN_TEXTO: { type: 'string', example: 'Texto de la noticia' },
        PAGN_AUTOR: { type: 'string', example: 'Autor de la noticia' },
        },
    },
    })
    async createNoticias(
        @Headers('apikey') apiKey: string,
        @Headers('apisecret') apiSecret: string,
        @Body() createNoticiasDto: CreateNoticiasDto
    ) {
        if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
            throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
        }
        return this.aprehenserService.createNoticias(createNoticiasDto);
    }


  @Get('noticias-fotos/:PAGN_ID')
  @ApiOperation({ summary: 'Ver fotos de una noticia' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getNoticiasFotos(
    @Param('PAGN_ID') PAGN_ID: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getNoticiasFotos(PAGN_ID);
  }

  @Post('noticias-fotos')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Agregar una foto a una noticia' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        PAGN_ID: { type: 'integer', example: 1 }, // ID de la noticia
        file: { type: 'string', format: 'binary' }, // Archivo a subir
      },
    },
  })
  async agregarFotoANoticia(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createNoticiaImagenDto: CreateNoticiaImagenDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.agregarFotoANoticia(createNoticiaImagenDto, file);
  }

  @Delete('noticias-fotos/:PGNI_ID')
  @ApiOperation({ summary: 'Eliminar fotos de una noticia' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async deleteFoto(
    @Param('PGNI_ID') PGNI_ID: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.deleteFoto(PGNI_ID);
  }


    @Put('noticias-foto')
    @ApiOperation({ summary: 'Desactivar foto de una noticia' })
    @ApiHeader({ name: 'apikey', required: true })
    @ApiHeader({ name: 'apisecret', required: true })
    @ApiBody({
    schema: {
        type: 'object',
        properties: {
        PGNI_ID: { type: 'integer', example: 1, description: 'ID de la foto' },
        },
    },
    })
    async toggleFotoPortada(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body('PGNI_ID') PGNI_ID: number,
    ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.aprehenserService.toggleFotoPortada(PGNI_ID);
    }

  @Get('desarrollo-formacion-titulo')
  @ApiOperation({ summary: 'Obtiene el título y la descripción del módulo' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getDesarrolloFormacionTitulo(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getDesarrolloFormacionTitulo();
  }

  
  @Put('desarrollo-formacion-titulo')
  @ApiOperation({ summary: 'Modifica el título o la descripción del módulo' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({
    description: 'Actualiza el título y/o la descripción del módulo',
    schema: {
      type: 'object',
      properties: {
        DES_ID: { type: 'integer', example: 1 },
        DES_NOMBRE: { type: 'string', example: 'Desarrollo y Formación' },
        DES_TEXTO: { 
          type: 'string', 
          example: 'Impulsamos el desarrollo docente que potencie la calidad educativa por medio de acciones de formación, capacitación y asesoría continua.' 
        },
      },
    },
  })
  async updateDesarrolloFormacionTitulo(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateDesarrolloFormacionDto: UpdateDesarrolloFormacionDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.updateDesarrolloFormacionTitulo(updateDesarrolloFormacionDto);
  }

  @Get('desarrollo-formacion-ambito')
  @ApiOperation({ summary: 'Todos los ambitos actuales' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'DES_ID', required: true, type: Number, description: 'ID del desarrollo' })
  async getDesarrolloFormacionAmbito(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('DES_ID') desId: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getDesarrolloFormacionAmbito(desId);
  }


  @Get('desarrollo-formacion-ambito-cursos')
  @ApiOperation({ summary: 'Todos los cursos por ambito' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'AMB_ID', required: true, type: Number, description: 'ID del ambito' })
  async getDesarrolloFormacionAmbitoCursos(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('AMB_ID') ambId: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getDesarrolloFormacionAmbitoCursos(ambId);
  }

    @Post('formacion-ambito-cursos')
    @UseInterceptors(FileInterceptor('DESC_IMAGEN')) // 'DESC_IMAGEN' es el campo de archivo
    @ApiOperation({ summary: 'Crea un curso asignado a un ámbito' })
    @ApiHeader({ name: 'apikey', required: true })
    @ApiHeader({ name: 'apisecret', required: true })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
    schema: {
        type: 'object',
        properties: {
        DESC_TEMA: { type: 'string', example: 'Curso de programación' },
        DESC_DURACION: { type: 'string', example: '200 horas' },
        DESC_ITINERARIO: { type: 'string', example: 'de 9:00 a 13:00' },
        DESC_FECHADESDE: { type: 'string', format: 'date', example: '2023-01-01' },
        DESC_FECHAHASTA: { type: 'string', format: 'date', example: '2023-06-01' },
        AMB_ID: { type: 'integer', example: 1 },
        EDC_ID: { type: 'integer', example: 2 },
        DESC_ESTADO: { type: 'integer', example: 1, default: 1 },
        DESC_IMAGEN: { type: 'string', format: 'binary' },
        TDC_ID: { type: 'integer', example: 1 },
        DESC_VALOR: { type: 'number', example: 50 },
        DESC_CONTENIDO: { type: 'string', example: 'Plan de estudios...' },
        },
    },
    })
    async createCurso(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createCursoDto: CreateCursoDto,
    @UploadedFile() file: Express.Multer.File,
    ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.createCurso(createCursoDto, file);
    }



  @Get('desarrollo-formacion-ambito-cursos-registros')
  @ApiOperation({ summary: 'Todos los registros realizados a un curso de un ambito' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'DESC_ID', required: true, type: Number, description: 'ID del curso' })
  async getDesarrolloFormacionAmbitoCursosRegistros(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('DESC_ID') descId: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.getDesarrolloFormacionAmbitoCursosRegistros(descId);
  }



  @Post('desarrollo-formacion-ambito-cursos-registros')
  @ApiOperation({ summary: 'Registra a un participante en un curso de un ámbito publicado' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({
    description: 'Información del participante para el registro en el curso',
    schema: {
        type: 'object',
        properties: {
        DESC_ID: { type: 'integer', example: 1, description: 'ID del curso' },
        REC_NOMBRES: { type: 'string', example: 'Juan Pérez', description: 'Nombre del participante' },
        REC_CORREO: { type: 'string', example: 'juan.perez@example.com', description: 'Correo electrónico del participante' },
        REC_CEDULA: { type: 'string', example: '1234567890', description: 'Cédula del participante' },
        REC_TELEFONO: { type: 'string', example: '0991234567', description: 'Teléfono del participante' },
        },
    },
  })
  async registrarParticipanteCurso(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createCursoRegistroDto: CreateCursoRegistroDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('API key o secret inválido', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.registrarParticipanteCurso(createCursoRegistroDto);
  }

  @Put('desarrollo-formacion-ambito-curso-cambio-estado')
  @ApiOperation({ summary: 'Actualiza el estado de un participante de un curso' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({
    type: UpdateCursoEstadoDto,
    description: 'Inscrito - REC_ESTADO=1, Finalizado - REC_ESTADO=2, Reprobado - REC_ESTADO=3',
  })
  async updateCursoEstado(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateCursoEstadoDto: UpdateCursoEstadoDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.aprehenserService.updateCursoEstado(updateCursoEstadoDto);
  }



}
