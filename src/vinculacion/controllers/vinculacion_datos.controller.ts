// src/vinculacion/controllers/vinculacion_datos.controller.ts
import { Controller, Get, Post, Body, Param, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

import { VinculacionDatosService } from '../services/vinculacion_datos.service';

import { CreatePracticaTipoDto } from '../dtos/create-practica-tipo.dto';
import { CreateCineCampoAmplioDto } from '../dtos/create-cine-campo-amplio.dto';
import { CreateCineCampoEspecificoDto } from '../dtos/create-cine-campo-especifico.dto';
import { CreateCineCampoDetalladoDto } from '../dtos/create-cine-campo-detallado.dto';

@ApiTags('Vinculación Datos General')
@Controller('vinculacion')
export class VinculacionDatosController {
  constructor(private readonly vinculacionDatosService: VinculacionDatosService) {}


   

  @Get('usuario-carrera/:usuId')
  @ApiOperation({ summary: 'Carreras asignadas al usuario con privilegios' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getCarrerasPorUsuario(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('usuId') usuId: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionDatosService.findUsuarioCarreraPrivilegios(usuId);
  }



  // GET: Tipos de prácticas activas
  @Get('tipos-practicas-activas')
  @ApiOperation({ summary: 'Obtener tipos de prácticas activas' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getActivePracticas(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionDatosService.findActivePracticas();
  }

  // GET: Tipo de especificación, práctica / pasantía
  @Get('tipos-especificacion-practicas')
  @ApiOperation({ summary: 'Obtener tipos de especificación: prácticas / pasantías' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getActiveEspecificaciones(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionDatosService.findActiveEspecificaciones();
  }

  // GET: Codificación CINE - Campo Amplio
  @Get('codificacion-cine-campo-amplio')
  @ApiOperation({ summary: 'Obtener Codificación CINE - Campo Amplio' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getActiveCineCampoAmplio(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionDatosService.findActiveCineCampoAmplio();
  }

  // GET: Codificación CINE - Campo Específico por idCampoAmplio
  @Get('codificacion-cine-campo-especifico/:idCampoAmplio')
  @ApiOperation({ summary: 'Obtener Codificación CINE - Campo Específico por idCampoAmplio' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getCineCampoEspecifico(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('idCampoAmplio') idCampoAmplio: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionDatosService.findCineCampoEspecificoByCampoAmplio(idCampoAmplio);
  }

  // GET: Codificación CINE - Campo Detallado por idCampoEspecifico
  @Get('codificacion-cine-campo-detallado/:idCampoEspecifico')
  @ApiOperation({ summary: 'Obtener Codificación CINE - Campo Detallado por idCampoEspecifico' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getCineCampoDetallado(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('idCampoEspecifico') idCampoEspecifico: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionDatosService.findCineCampoDetalladoByCampoEspecifico(idCampoEspecifico);
  }

  // POST: Agregar tipo de práctica
  @Post('agregar-tipo-practica')
  @ApiOperation({ summary: 'Agregar un nuevo tipo de práctica' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async addPracticaTipo(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createPracticaTipoDto: CreatePracticaTipoDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionDatosService.createPracticaTipo(createPracticaTipoDto);
  }

  // POST: Agregar un código CINE - Campo Amplio
  @Post('agregar-codigo-cine-campo-amplio')
  @ApiOperation({ summary: 'Agregar un nuevo código CINE - Campo Amplio' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async addCineCampoAmplio(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createCineCampoAmplioDto: CreateCineCampoAmplioDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionDatosService.createCineCampoAmplio(createCineCampoAmplioDto);
  }

  // POST: Agregar un código CINE - Campo Específico
  @Post('agregar-codigo-cine-campo-especifico')
  @ApiOperation({ summary: 'Agregar un nuevo código CINE - Campo Específico' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async addCineCampoEspecifico(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createCineCampoEspecificoDto: CreateCineCampoEspecificoDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionDatosService.createCineCampoEspecifico(
      createCineCampoEspecificoDto.VCCA_ID,
      createCineCampoEspecificoDto.VCCE_CODIGO,
      createCineCampoEspecificoDto.VCCE_DESCRIPCION,
    );
  }

  // POST: Agregar un código CINE - Campo Detallado
  @Post('agregar-codigo-cine-campo-detallado')
  @ApiOperation({ summary: 'Agregar un nuevo código CINE - Campo Detallado' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async addCineCampoDetallado(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createCineCampoDetalladoDto: CreateCineCampoDetalladoDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionDatosService.createCineCampoDetallado(
      createCineCampoDetalladoDto.VCCE_ID,
      createCineCampoDetalladoDto.VCCD_CODIGO,
      createCineCampoDetalladoDto.VCCD_DESCRIPCION,
    );
  }

  // GET: Estados de un estudiante referente a una práctica o vinculación
  @Get('vinculacion-practica-estudiante-estados')
  @ApiOperation({ summary: 'Estados de un estudiante referente a una práctica o vinculación' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getEstadosEstudiante(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionDatosService.getEstadosEstudiante();
  }

}
