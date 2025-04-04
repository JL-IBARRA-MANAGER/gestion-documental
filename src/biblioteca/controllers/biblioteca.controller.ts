import { Controller, Get, Put, Param, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { BibliotecaService } from '../services/biblioteca.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUpdateTitulacionDto } from '../dtos/create-update-titulacion.dto';

@ApiTags('Biblioteca')
@Controller('biblioteca')
export class BibliotecaController {
  constructor(private readonly bibliotecaService: BibliotecaService) {}

  @Get('historicos-biblioteca')
  @ApiOperation({ summary: 'Obtener historicos de biblioteca' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getHistoricos(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.bibliotecaService.findHistoricos();
  }

  @Get('pendientes-biblioteca')
  @ApiOperation({ summary: 'Obtener pendientes de biblioteca' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getPendientes(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.bibliotecaService.findPendientes();
  }



  @Put('revision-biblioteca/:id')
  @ApiOperation({ summary: 'Actualizar revisión de biblioteca' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async updateRevision(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
    @Body() updateData: CreateUpdateTitulacionDto
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    console.log('Received data:', updateData);
    try {
      const updatedRecord = await this.bibliotecaService.updateRevision(id, updateData);
      console.log('Successfully updated record:', updatedRecord);
      return updatedRecord;
    } catch (error) {
      console.error('Error in updateRevision:', error.message);
      throw new HttpException('Error updating revision', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get('rechazado-biblioteca')
  @ApiOperation({ summary: 'Obtener rechazados de biblioteca' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getRechazados(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.bibliotecaService.findRechazados();
  }

  @Get('aprobados-biblioteca')
  @ApiOperation({ summary: 'Obtener aprobados de biblioteca' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getAprobados(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.bibliotecaService.findAprobados();
  }
}
