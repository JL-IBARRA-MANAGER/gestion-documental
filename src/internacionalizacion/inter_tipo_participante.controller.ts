import { Controller, Get, Post, Put, Delete, Param, Body, Headers } from '@nestjs/common';
import { InterTipoParticipanteService } from './inter_tipo_participante.service';
import { ApiTags, ApiOperation, ApiParam, ApiHeader, ApiExcludeEndpoint } from '@nestjs/swagger';
import { InterTipoParticipante } from './inter_tipo_participante.entity';

@ApiTags('InterTipoParticipante')
@Controller('intertipoparticipante')
export class InterTipoParticipanteController {
  constructor(private readonly interTipoParticipanteService: InterTipoParticipanteService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de InterTipoParticipante' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async findAll(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interTipoParticipanteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de InterTipoParticipante por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterTipoParticipante' })
  async findOneById(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interTipoParticipanteService.findOneBy(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un registro de InterTipoParticipante' })
  async create(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() data: Partial<InterTipoParticipante>,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interTipoParticipanteService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un registro de InterTipoParticipante por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterTipoParticipante' })
  async update(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
    @Body() data: Partial<InterTipoParticipante>,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interTipoParticipanteService.update(id, data);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Eliminar un registro de InterTipoParticipante por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de InterTipoParticipante' })
  async delete(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interTipoParticipanteService.delete(id);
  }
}
