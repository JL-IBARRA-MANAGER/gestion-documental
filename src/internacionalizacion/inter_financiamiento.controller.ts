import { Controller, Get, Post, Put, Delete, Param, Body, Headers } from '@nestjs/common';
import { InterFinanciamientoService } from './inter_financiamiento.service';
import { InterFinanciamiento } from './inter_financiamiento.entity';
import { ApiTags, ApiOperation, ApiParam, ApiHeader, ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiTags('InterFinanciamiento')
@Controller('inter-financiamiento')
export class InterFinanciamientoController {
  constructor(
    private readonly interFinanciamientoService: InterFinanciamientoService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de InterFinanciamiento' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async findAll(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interFinanciamientoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de InterFinanciamiento por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterFinanciamiento' })
  async findById(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Param('id') id: number) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interFinanciamientoService.findOneBy(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro de InterFinanciamiento' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async create(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Body() data: Partial<InterFinanciamiento>) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interFinanciamientoService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un registro de InterFinanciamiento por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterFinanciamiento' })
  async update(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Param('id') id: number, @Body() data: Partial<InterFinanciamiento>) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interFinanciamientoService.update(id, data);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Eliminar un registro de InterFinanciamiento por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterFinanciamiento' })
  async delete(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Param('id') id: number) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interFinanciamientoService.delete(id);
  }
}
