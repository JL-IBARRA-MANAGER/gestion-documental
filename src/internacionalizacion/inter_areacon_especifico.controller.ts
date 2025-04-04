import { Controller, Get, Param, Headers } from '@nestjs/common';
import { InterAreaconEspecificoService } from './inter_areacon_especifico.service';
import { ApiTags, ApiOperation, ApiHeader, ApiParam } from '@nestjs/swagger';

@ApiTags('InterAreaconEspecifico')
@Controller('interareaconespecifico')
export class InterAreaconEspecificoController {
  constructor(private readonly interAreaconEspecificoService: InterAreaconEspecificoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de inter_areacon_especifico' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async findAll(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interAreaconEspecificoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de inter_areacon_especifico por ID' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del registro de inter_areacon_especifico' })
  async findById(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('id') id: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.interAreaconEspecificoService.findOneBy(id);
  }
}
