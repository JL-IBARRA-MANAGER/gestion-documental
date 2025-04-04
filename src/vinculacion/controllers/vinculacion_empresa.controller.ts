import { Controller, Get, Post, Put, Body, Param, Headers, HttpException, HttpStatus, Query } from '@nestjs/common';
import { VinculacionEmpresaService } from '../services/vinculacion_empresa.service';
import { ApiOperation, ApiTags, ApiHeader, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateVinculacionEmpresaDto } from '../dtos/create-vinculacion-empresa.dto';
import { UpdateVinculacionEmpresaEstadoDto } from '../dtos/update-vinculacion-empresa-estado.dto';
import { UpdateVinculacionEmpresaDto } from '../dtos/update-vinculacion-empresa.dto';

@ApiTags('Vinculacion Empresa')
@Controller('vinculacion_empresa')
export class VinculacionEmpresaController {
  constructor(private readonly vinculacionEmpresaService: VinculacionEmpresaService) {}

  @Get('empresas_vinculadas')
  @ApiOperation({ summary: 'Obtener empresas vinculadas' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getEmpresasVinculadas(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionEmpresaService.getEmpresasVinculadas();
  }



  @Get('empresas-vinculadas')
  @ApiOperation({ summary: 'Obtener empresas vinculadas por id' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiQuery({ name: 'VINE_ID', required: true, type: Number })
  async getEmpresaVinculadaById(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Query('VINE_ID') VINE_ID: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.vinculacionEmpresaService.getEmpresaVinculadaById(VINE_ID);
  }

  @Put('empresas_vinculadas')
  @ApiOperation({ summary: 'Editar una empresa por Id' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({ type: UpdateVinculacionEmpresaDto })
  async updateEmpresaVinculada(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateDto: UpdateVinculacionEmpresaDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.vinculacionEmpresaService.updateEmpresaVinculada(updateDto);
  }


  @Post('vincular_empresa')
  @ApiOperation({ summary: 'Vincular una nueva empresa' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({ type: CreateVinculacionEmpresaDto })
  async vincularEmpresa(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createDto: CreateVinculacionEmpresaDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionEmpresaService.vincularEmpresa(createDto);
  }


  @Get('tipo_empresa')
  @ApiOperation({ summary: 'Obtener tipos de empresa' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getTipoEmpresa(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionEmpresaService.getTipoEmpresa();
  }


  @Put('actualizar_estado/:id')
  @ApiOperation({ summary: 'Actualizar estado de una empresa' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({ type: UpdateVinculacionEmpresaEstadoDto })
  async actualizarEstado(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
    @Body() updateEstadoDto: UpdateVinculacionEmpresaEstadoDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.vinculacionEmpresaService.actualizarEstado(id, updateEstadoDto.estado);
  }


}
