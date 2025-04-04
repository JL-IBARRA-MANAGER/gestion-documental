import { Controller, Get, Post, Put, Delete, Param, Body, Headers } from '@nestjs/common';
import { InterNivelService } from './inter_nivel.service';
import { InterNivel } from './inter_nivel.entity';
import { ApiTags, ApiOperation, ApiParam, ApiHeader, ApiExcludeEndpoint } from '@nestjs/swagger';

@ApiTags('InterNivel')
@Controller('inter-nivel')
export class InterNivelController {
  constructor(
    private readonly interNivelService: InterNivelService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de InterNivel' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async findAll(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interNivelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de InterNivel por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterNivel' })
  async findById(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Param('id') id: number) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interNivelService.findOneBy(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro de InterNivel' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async create(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Body() data: Partial<InterNivel>) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interNivelService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un registro de InterNivel por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterNivel' })
  async update(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Param('id') id: number, @Body() data: Partial<InterNivel>) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interNivelService.update(id, data);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Eliminar un registro de InterNivel por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterNivel' })
  async delete(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string, @Param('id') id: number) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interNivelService.delete(id);
  }
}
