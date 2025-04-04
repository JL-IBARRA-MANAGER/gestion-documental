import { Controller, Get, Post, Put, Delete, Param, Body, Headers } from '@nestjs/common';
import { InterAreaConocimientoService } from './inter_area_conocimiento.service';
import { ApiTags, ApiOperation, ApiParam, ApiHeader, ApiExcludeEndpoint } from '@nestjs/swagger';
import { InterAreaConocimiento } from './inter_area_conocimiento.entity';

@ApiTags('InterAreaConocimiento')
@Controller('interareaconocimiento')
export class InterAreaConocimientoController {
  constructor(private readonly interAreaConocimientoService: InterAreaConocimientoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de InterAreaConocimiento' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async findAll(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interAreaConocimientoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de InterAreaConocimiento por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterAreaConocimiento' })
  async findOneById(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interAreaConocimientoService.findOneBy(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un registro de InterAreaConocimiento' })
  async create(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() data: Partial<InterAreaConocimiento>,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interAreaConocimientoService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un registro de InterAreaConocimiento por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterAreaConocimiento' })
  async update(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
    @Body() data: Partial<InterAreaConocimiento>,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interAreaConocimientoService.update(id, data);
  }

  @Delete(':id')
  @ApiExcludeEndpoint() // Esto oculta el endpoint DELETE en Swagger
  async delete(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interAreaConocimientoService.delete(id);
  }
}
