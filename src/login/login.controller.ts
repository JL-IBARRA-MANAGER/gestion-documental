import { Controller, Post, Body, Headers } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiTags, ApiOperation, ApiBody, ApiHeader, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { RutasDto } from './dto/rutas.dto'; // Usa el archivo externo

class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'jlibarra', description: 'Nombre de usuario' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '', description: 'Contraseña del usuario' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'documental', description: 'API Key válida' })
  apiKey: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Documental2021', description: 'API Secret válido' })
  apiSecret: string;
}

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiOperation({ summary: 'Valida credenciales, usuario y clave, devuelve true o false' })
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    const { username, password, apiKey, apiSecret } = body;
    return this.loginService.validateUser(username, password, apiKey, apiSecret);
  }

  @Post('rutas')
  @ApiOperation({ summary: 'Devuelve las rutas asignadas al rol de usuario' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({ type: RutasDto })
  async getRutas(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() body: RutasDto
  ) {
    const { rolId } = body;
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid API key or secret' };
    }
    return this.loginService.getUserRutas(rolId);
  }
}
