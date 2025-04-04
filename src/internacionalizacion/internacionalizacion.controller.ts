import { Controller, Get, Put, Post, Param, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiHeader, ApiBody } from '@nestjs/swagger';
import { InternacionalizacionService } from './internacionalizacion.service';  
import { CreateInternacionalizacionDto } from './dtos/create_internacionalizacion.dto';  
import { UpdateInternacionalizacionDto } from './dtos/update_internacionalizacion.dto';  

@ApiTags('Internacionalizacion')
@Controller('internacionalizacion')
export class InternacionalizacionController {
  constructor(
    private readonly internacionalizacionService: InternacionalizacionService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de internacionalizacion' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async findAll(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.internacionalizacionService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un registro de internacionalizacion por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de internacionalizacion' })
  @ApiBody({ type: UpdateInternacionalizacionDto })
  async update(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
    @Body() updateData: UpdateInternacionalizacionDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.internacionalizacionService.update(id, updateData);
  }

  @Get(':interId')
  @ApiOperation({ summary: 'Obtener un registro de internacionalizacion por INTER_ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'interId', type: 'number', description: 'ID del registro de internacionalizacion' })
  async findByInterId(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('interId') interId: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.internacionalizacionService.findByInterId(interId);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro de internacionalizacion' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({ type: CreateInternacionalizacionDto })
  async create(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createData: CreateInternacionalizacionDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.internacionalizacionService.create(createData);
  }
}
