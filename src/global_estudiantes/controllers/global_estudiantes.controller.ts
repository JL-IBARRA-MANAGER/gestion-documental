import { Controller, Get, Post, Body, Headers, Query } from '@nestjs/common';  
import { ApiHeader, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';  
import { GlobalEstudiantesService } from '../services/global_estudiantes.service';  
import { CreateGlobalEstudiantesDto } from '../dtos/create-global-estudiantes.dto';   

@ApiTags('GlobalEstudiantes')  
@Controller('global_estudiantes')  
export class GlobalEstudiantesController {  
  constructor(private readonly globalEstudiantesService: GlobalEstudiantesService) {}  

  @Get()  
  @ApiOperation({ summary: 'Obtener registros de estudiantes globales' })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  async getGlobalEstudiantes(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {  
    // Validación de los headers  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      return { success: false, message: 'Invalid API key or secret' };  
    }  
    // Llama al servicio que hace la consulta  
    const estudiantes = await this.globalEstudiantesService.findAll();  
    return { success: true, data: estudiantes };  
  }  

  @Post('global-estudiantes')  
  @ApiOperation({ summary: 'Recibe una identificación y devuelve los datos generales del estudiante' })  
  async getStudentByIdentificacion(@Body() body: CreateGlobalEstudiantesDto) {  
    const { IDENTIFICACION } = body;  
    return this.globalEstudiantesService.findLastByIdentificacion(IDENTIFICACION);  
  }  

  @Get('global-estudiantes-cedula')  
  @ApiOperation({ summary: 'Devuelve los nombres y apellidos a partir de una cédula' })  
  @ApiQuery({ name: 'IDENTIFICACION', required: true })  
  @ApiHeader({ name: 'apikey', required: true })  
  @ApiHeader({ name: 'apisecret', required: true })  
  async getEstudiantesPorCedula(@Query('IDENTIFICACION') identificacion: string, @Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {  
    // Validación de los headers  
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {  
      return { success: false, message: 'Invalid API key or secret' };  
    }  
    // Llama al servicio que hace la consulta  
    return this.globalEstudiantesService.findByIdentificacion(identificacion);  
  }  
}