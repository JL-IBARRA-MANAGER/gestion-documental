import { Controller, Get, Post, Put, Delete, Param, Body, Headers } from '@nestjs/common';
import { InterPaisService } from './inter_pais.service';
import { InterPais } from './inter_pais.entity';
import { ApiTags, ApiOperation, ApiParam, ApiHeader, ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiTags('InterPais')
@Controller('inter-pais')
export class InterPaisController {
  constructor(
    private readonly interPaisService: InterPaisService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de InterPais' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async findAll(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interPaisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de InterPais por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterPais' })
  async findById(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Param('id') id: number) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interPaisService.findOneBy(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro de InterPais' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async create(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Body() data: Partial<InterPais>) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interPaisService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un registro de InterPais por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterPais' })
  async update(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Param('id') id: number, @Body() data: Partial<InterPais>) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interPaisService.update(id, data);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Eliminar un registro de InterPais por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterPais' })
  async delete(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Param('id') id: number) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interPaisService.delete(id);
  }
}
