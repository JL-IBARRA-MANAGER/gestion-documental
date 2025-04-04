import {
  Controller,
  Get,
  Post,
  Put,
  Headers,
  HttpException,
  HttpStatus,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RepositorioService } from '../services/repositorio.service';
import { ApiHeader, ApiOperation, ApiBody, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateReglamentoAcademicoDto } from '../dtos/create-reglamento-academico.dto';
import { UpdateReglamentoAcademicoDto } from '../dtos/update-reglamento-academico.dto';



@ApiTags('Repositorio')
@Controller('repositorio')
export class RepositorioController {
  constructor(private readonly repositorioService: RepositorioService) {}

  @Get('reglamento-academico')
  @ApiOperation({ summary: 'Reglamento de régimen académico' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getReglamentoAcademico(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.repositorioService.getReglamentoAcademico();
  }

  @Post('reglamento-academico')
  @UseInterceptors(FileInterceptor('RRA_RUTA'))
  @ApiOperation({ summary: 'Agrega un reglamento de régimen académico' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Información del reglamento a registrar',
    schema: {
      type: 'object',
      properties: {
        RRA_FECHA: { type: 'string', example: '2024-10-30' },
        RRA_NOMBRE: { type: 'string', example: 'Reglamento General' },
        RRA_OBSERVACION: { type: 'string', example: 'Este es el reglamento oficial' },
        RRA_RUTA: { type: 'string', format: 'binary', description: 'Archivo del reglamento' },
      },
    },
  })
  async registrarReglamentoAcademico(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createReglamentoAcademicoDto: CreateReglamentoAcademicoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('API key o secret inválido', HttpStatus.UNAUTHORIZED);
    }
    return this.repositorioService.registrarReglamentoAcademico(createReglamentoAcademicoDto, file);
  }



  @Put('editar-reglamento')
  @UseInterceptors(FileInterceptor('RRA_RUTA'))
  @ApiOperation({ summary: 'Editar un reglamento de régimen académico' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Información del reglamento a actualizar',
    type: UpdateReglamentoAcademicoDto,
  })
  async editarReglamentoAcademico(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() updateReglamentoAcademicoDto: UpdateReglamentoAcademicoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('API key o secret inválido', HttpStatus.UNAUTHORIZED);
    }
    return this.repositorioService.editarReglamentoAcademico(updateReglamentoAcademicoDto, file);
  }


}
