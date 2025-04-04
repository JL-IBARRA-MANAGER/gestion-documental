// src/estadisticas/controllers/estadisticas.controller.ts
import { Controller, Get, Query, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { EstadisticasService } from '../services/estadisticas.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Estadisticas')
@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener estadísticas de graduados en un rango de fechas' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async obtenerEstadisticas(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    // Validar API key y secret
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.estadisticasService.obtenerEstadisticas(fechaInicio, fechaFin);
  }
}
