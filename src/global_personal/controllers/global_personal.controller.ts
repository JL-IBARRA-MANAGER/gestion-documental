import { Controller, Get, Headers } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalPersonalService } from '../services/global_personal.service';

@ApiTags('GlobalPersonal')
@Controller('global_personal')
export class GlobalPersonalController {
  constructor(private readonly globalPersonalService: GlobalPersonalService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener registros de personal global' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getGlobalPersonal(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.globalPersonalService.findAll();
  }
}
