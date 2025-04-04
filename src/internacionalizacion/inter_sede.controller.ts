import { Controller, Get, Post, Put, Delete, Param, Body, Headers } from '@nestjs/common';
import { InterSedeService } from './inter_sede.service';
import { ApiTags, ApiOperation, ApiParam, ApiHeader, ApiExcludeEndpoint } from '@nestjs/swagger';
import { InterSede } from './inter_sede.entity';

@ApiTags('InterSede')
@Controller('intersede')
export class InterSedeController {
  constructor(
    private readonly interSedeService: InterSedeService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de InterSede' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async findAll(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interSedeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de InterSede por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterSede' })
  async findOne(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interSedeService.findOneBy(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro de InterSede' })
  async create(@Body() data: Partial<InterSede>) {
    return this.interSedeService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un registro de InterSede por ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterSede' })
  async update(@Param('id') id: number, @Body() data: Partial<InterSede>) {
    return this.interSedeService.update(id, data);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Eliminar un registro de InterSede por ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterSede' })
  async delete(@Param('id') id: number) {
    return this.interSedeService.delete(id);
  }
}
