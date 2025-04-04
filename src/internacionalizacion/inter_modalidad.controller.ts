import { Controller, Get, Post, Put, Delete, Param, Body, Headers } from '@nestjs/common';
import { InterModalidadService } from './inter_modalidad.service';
import { InterModalidad } from './inter_modalidad.entity';
import { ApiTags, ApiOperation, ApiParam, ApiHeader, ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiTags('InterModalidad')
@Controller('inter-modalidad')
export class InterModalidadController {
  constructor(
    private readonly interModalidadService: InterModalidadService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de InterModalidad' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async findAll(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interModalidadService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de InterModalidad por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterModalidad' })
  async findById(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Param('id') id: number) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interModalidadService.findOneBy(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro de InterModalidad' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async create(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Body() data: Partial<InterModalidad>) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interModalidadService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un registro de InterModalidad por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterModalidad' })
  async update(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Param('id') id: number, @Body() data: Partial<InterModalidad>) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interModalidadService.update(id, data);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Eliminar un registro de InterModalidad por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterModalidad' })
  async delete(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Param('id') id: number) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interModalidadService.delete(id);
  }
}
