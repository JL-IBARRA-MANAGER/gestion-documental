import { Controller, Get, Post, Put, Delete, Param, Body, Headers } from '@nestjs/common';
import { InterCarreraService } from './inter_carrera.service';
import { ApiTags, ApiOperation, ApiParam, ApiHeader, ApiExcludeEndpoint } from '@nestjs/swagger';
import { InterCarrera } from './inter_carrera.entity';

@ApiTags('InterCarrera')
@Controller('intercarrera')
export class InterCarreraController {
  constructor(private readonly interCarreraService: InterCarreraService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de InterCarrera' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async findAll(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interCarreraService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de InterCarrera por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterCarrera' })
  async findOneById(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interCarreraService.findOneBy(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un registro de InterCarrera' })
  async create(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() data: Partial<InterCarrera>,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interCarreraService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un registro de InterCarrera por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterCarrera' })
  async update(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
    @Body() data: Partial<InterCarrera>,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interCarreraService.update(id, data);
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
    return this.interCarreraService.delete(id);
  }
}
