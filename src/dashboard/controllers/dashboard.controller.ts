import { Controller, Get, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}


  @Get('graduados')
  @ApiOperation({ summary: 'Total de graduados' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getTotalGraduados(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.dashboardService.getTotalGraduados();
  }

  @Get('graduados-escuelas')
  @ApiOperation({ summary: 'Graduados por escuelas' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getGraduadosPorEscuelas(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.dashboardService.getGraduadosPorEscuelas();
  }

  @Get('graduados-carrera')
  @ApiOperation({ summary: 'Total de graduados por carrera' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getGraduadosPorCarrera(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.dashboardService.getGraduadosPorCarrera();
  }

  @Get('graduados-hombres')
  @ApiOperation({ summary: 'Total de graduados hombres' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getTotalGraduadosHombres(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.dashboardService.getTotalGraduadosHombres();
  }

  @Get('graduados-mujeres')
  @ApiOperation({ summary: 'Total de graduadas mujeres' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getTotalGraduadasMujeres(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.dashboardService.getTotalGraduadasMujeres();
  }

  @Get('graduados-sin-sexo')
  @ApiOperation({ summary: 'Total de graduados sin sexo registrado' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getTotalGraduadosSinSexo(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.dashboardService.getTotalGraduadosSinSexo();
  }

}
