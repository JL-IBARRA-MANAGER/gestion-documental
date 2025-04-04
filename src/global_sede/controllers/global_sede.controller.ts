// src/global_sede/controllers/global_sede.controller.ts
import { Controller, Get, Put, Param, Body, Headers, HttpException, HttpStatus, ParseIntPipe  } from '@nestjs/common';
import { GlobalSedeService } from '../services/global_sede.service';
import { UpdateSedeNombreDto } from '../dtos/update-sede-nombre.dto';
import { UpdateSedeEstadoDto } from '../dtos/update-sede-estado.dto';
import { ApiHeader, ApiOperation, ApiTags, ApiParam  } from '@nestjs/swagger';

@ApiTags('GlobalSede')
@Controller('global_sede')
export class GlobalSedeController {
  constructor(private readonly globalSedeService: GlobalSedeService) {}

  @Get('activos')
  @ApiOperation({ summary: 'Obtener todas las sedes activas' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getActiveSedes(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.globalSedeService.findActiveSedes();
  }

  @Put('actualizar-nombre/:id')
  @ApiOperation({ summary: 'Actualizar el nombre de una sede' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async updateSedeNombre(
    @Param('id') id: number,
    @Body() updateSedeNombreDto: UpdateSedeNombreDto,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.globalSedeService.updateSedeNombre(id, updateSedeNombreDto);
  }

  @Put('actualizar-estado/:id')
  @ApiOperation({ summary: 'Actualizar el estado de una sede' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async updateSedeEstado(
    @Param('id') id: number,
    @Body() updateSedeEstadoDto: UpdateSedeEstadoDto,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.globalSedeService.updateSedeEstado(id, updateSedeEstadoDto);
  }



  @Get('global_provincial')  
  @ApiOperation({ summary: 'Muestra todas las provincias del Ecuador' })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  async getProvincias(  
    @Headers('apikey') apiKey: string,   
    @Headers('apisecret') apiSecret: string  
  ) {  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
    }  
    return this.globalSedeService.findAllProvincias();  
  }  


  @Get('global_cantones/:id_provincia')  
  @ApiOperation({ summary: 'Obtener cantones por provincia' })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  @ApiParam({ name: 'id_provincia', type: 'number', description: 'ID de la provincia' })  
  async getCantonByProvincia(  
    @Headers('apikey') apiKey: string,   
    @Headers('apisecret') apiSecret: string,  
    @Param('id_provincia', ParseIntPipe) id_provincia: number  
  ) {  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
    }  
    return this.globalSedeService.findCantonByProvincia(id_provincia);  
  } 

  @Get('global_parroquias/:id_canton')  
  @ApiOperation({ summary: 'Obtener parroquias por cantón' })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  @ApiParam({ name: 'id_canton', type: Number, description: 'ID del cantón' })  
  async getParroquiasByCanton(  
    @Headers('apikey') apiKey: string,   
    @Headers('apisecret') apiSecret: string,  
    @Param('id_canton', ParseIntPipe) id_canton: number  
  ) {  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);  
    }  
    return this.globalSedeService.findParroquiasByCanton(id_canton);  
  } 



}
