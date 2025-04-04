import { Controller, Get, Headers, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { AlumniService } from '../services/alumni.service';
import { ApiHeader, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Alumni')
@Controller('alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Get('usuario-carrera-privilegios/:usuId')
  @ApiOperation({ summary: 'Obtener privilegios de carrera para un usuario' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getUsuarioCarreraPrivilegios(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('usuId') usuId: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.alumniService.getUsuarioCarreraPrivilegios(usuId);
  }

  @Get('carrera-datos/:idCarrera')
  @ApiOperation({ summary: 'Obtener datos de la carrera por idCarrera' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getDatosCarrera(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('idCarrera') idCarrera: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.alumniService.getDatosCarrera(idCarrera);
  }


  @Get('datos-estudiante-titulacion')
   @ApiOperation({ summary: 'Datos del estudiante de titulación por cédula/pasaporte e idCarrera' })
   @ApiHeader({ name: 'apikey', required: true })
   @ApiHeader({ name: 'apisecret', required: true })
   @ApiQuery({ name: 'identificacion', required: true, type: String })
   @ApiQuery({ name: 'idCarrera', required: true, type: Number })
   async getDatosEstudianteTitulacion(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('identificacion') identificacion: string,  // Cambio de @Param a @Query
    @Query('idCarrera') idCarrera: number,  // Cambio de @Param a @Query
   ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.alumniService.getDatosEstudianteTitulacion(identificacion, idCarrera);
  }


}
