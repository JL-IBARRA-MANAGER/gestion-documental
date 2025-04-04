import { Controller, Get, Post, Put, Delete, Param, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AdministracionService } from '../services/administracion.service';
import { ApiHeader, ApiOperation, ApiConsumes, ApiResponse, ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { UsuarioCarreraPrivilegios } from '../../titulacion/entities/usuario_carrera_privilegios.entity';
import { UpdateRolUsuarioDto } from '../dtos/update-rol-usuario.dto';
import { UpdateUsuarioEstadoDto } from '../dtos/update-usuario-estado.dto';
import { CreateUsuarioCarreraPrivilegiosDto } from '../dtos/create-usuario-carrera-privilegios.dto';
import { CreateRutaDto } from '../dtos/create-ruta.dto';

import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { CreateUsuarioRolDto } from '../dtos/create-usuario-rol.dto';


@ApiTags('Administracion')
@Controller('administracion')
export class AdministracionController {
  constructor(private readonly administracionService: AdministracionService) {}



  @Get('usuario-buscar/:username')
  @ApiOperation({ summary: 'Busca un usuario en la base de datos o en el directorio activo' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async buscarUsuario(
    @Param('username') username: string,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.buscarUsuario(username);
  }


  @Post('usuario-registrar')
  @ApiOperation({ summary: 'Registra un usuario PUCE-I en la tabla de usuarios' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async registrarUsuario(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createUsuarioDto: CreateUsuarioDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.administracionService.registrarUsuario(createUsuarioDto);
  }



  @Post('usuario-rol')
  @ApiOperation({ summary: 'Asigna un rol a un usuario registrado' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({
    type: CreateUsuarioRolDto,
    description: 'Datos necesarios para asignar un rol a un usuario.',
    examples: {
      ejemplo: {
        summary: 'Ejemplo de asignación de rol a un usuario',
        value: {
          ROL_ID: 1,
          USU_ID: 123,
        },
      },
    },
  })
  async asignarRolUsuario(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createUsuarioRolDto: CreateUsuarioRolDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.asignarRolUsuario(createUsuarioRolDto);
  }

  @Get('user-roles/:usuario')
  @ApiOperation({ summary: 'Obtener roles y rutas del usuario' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getUserRoles(
    @Param('usuario') usuario: string,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.findUserRoles(usuario);
  }

  @Get('rutas')
  @ApiOperation({ summary: 'Obtener todas las rutas activas' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getAllRutas(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.findAllRutas();
  }

  @Get('usuario-carrera/:idUsuario')
  @ApiOperation({ summary: 'Obtener privilegios de usuario y carrera por Id de usuario' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getUsuarioCarreraPrivilegios(
    @Param('idUsuario') idUsuario: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.findUsuarioCarreraPrivilegios(idUsuario);
  }

  
  @Get('usuario-carrera-by-usuario/:usuario')
  @ApiOperation({ summary: 'Obtener privilegios de usuario y carrera por nombre de usuario' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getUsuarioCarreraPrivilegiosUsuario(
    @Param('usuario') usuario: string,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.findUsuarioCarreraPrivilegiosByUsuario(usuario);
  }


  @Post('usuario-carrera')
  @ApiOperation({ summary: 'Crear un nuevo privilegio de usuario y carrera' })
  @ApiHeader({ name: 'apikey', required: true }) 
  @ApiHeader({ name: 'apisecret', required: true }) 
  @ApiBody({ type: CreateUsuarioCarreraPrivilegiosDto }) 
  async createUsuarioCarreraPrivilegio(
    @Body() data: CreateUsuarioCarreraPrivilegiosDto, 
    @Headers('apikey') apiKey: string, 
    @Headers('apisecret') apiSecret: string, 
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.createUsuarioCarreraPrivilegio(data);
  }

  @Get('graduados-por-carrera/:idCarrera')
  @ApiOperation({ summary: 'Obtener graduados por carrera' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getGraduadosPorCarrera(
    @Param('idCarrera') idCarrera: number,
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.findGraduadosByCarreraId(idCarrera);
  }


  @Get('roles')
  @ApiOperation({ summary: 'Obtener todos los roles' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getAllRoles(@Headers('apikey') apiKey: string, @Headers('apisecret') apiSecret: string) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.findAllRoles();
  }

  @Put('actualizar-rol-usuario/:idUsu')
  @ApiOperation({ summary: 'Actualizar rol del usuario' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({ type: UpdateRolUsuarioDto })
  async updateRolUsuario(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('idUsu') idUsu: number,
    @Body() updateDto: UpdateRolUsuarioDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.updateRolUsuario(idUsu, updateDto);
  }

    @Put('activar-desactivar-usuario/:idUsu')
    @ApiOperation({ summary: 'Activar o desactivar un usuario' })
    @ApiHeader({ name: 'apikey', required: true })
    @ApiHeader({ name: 'apisecret', required: true })
    @ApiBody({ type: UpdateUsuarioEstadoDto })
    async actualizarEstadoUsuario(
      @Headers('apikey') apiKey: string,
      @Headers('apisecret') apiSecret: string,
      @Param('idUsu') idUsu: number,
      @Body() updateUsuarioEstadoDto: UpdateUsuarioEstadoDto,
    ) {
      if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
      }
      return this.administracionService.actualizarEstadoUsuario(idUsu, updateUsuarioEstadoDto.estado);
    }


    @Put('usuario-carrera-estado')
    @ApiOperation({ summary: 'Activa o desactiva la carrera asignada al usuario' })
    @ApiHeader({ name: 'apikey', required: true })
    @ApiHeader({ name: 'apisecret', required: true })
    @ApiBody({
    description: 'Activa o desactiva la carrera asignada al usuario. 1 es activo y 0 es inactivo',
    schema: {
        type: 'object',
        properties: {
        idUsuario: { type: 'number', example: 18 },
        idCarrera: { type: 'number', example: 1 },
        estadoCarreraAsignada: { type: 'number', example: 1, description: '1 es activo y 0 es inactivo' },
        },
    },
    })
    async updateUsuarioCarreraEstado(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body('idUsuario') idUsuario: number,
    @Body('idCarrera') idCarrera: number,
    @Body('estadoCarreraAsignada') estadoCarreraAsignada: number,
    ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.administracionService.updateUsuarioCarreraEstado(idUsuario, idCarrera, estadoCarreraAsignada);
    }


    @Put('usuario-carrera-editar')
    @ApiOperation({ summary: 'Actualizar el estado de edición de usuario-carrera asignado' })
    @ApiHeader({ name: 'apikey', required: true })
    @ApiHeader({ name: 'apisecret', required: true })
    @ApiBody({
    description: 'Actualizar el estado de edición de usuario-carrera asignado. 1 es activo y 0 es inactivo',
    schema: {
        type: 'object',
        properties: {
        idUsuario: { type: 'number', example: 18 },
        idCarrera: { type: 'number', example: 1 },
        editarEstadoCarreraAsignada: { type: 'number', example: 1, description: '1 es activo y 0 es inactivo' },
        },
    },
    })
    async updateUsuarioCarreraEditarEstado(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body('idUsuario') idUsuario: number,
    @Body('idCarrera') idCarrera: number,
    @Body('editarEstadoCarreraAsignada') editarEstadoCarreraAsignada: number,
    ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.administracionService.updateUsuarioCarreraEditarEstado(idUsuario, idCarrera, editarEstadoCarreraAsignada);
    }


    @Put('usuario-carrera-titulacion-editar')
    @ApiOperation({ summary: 'Actualizar el estado de titulación de usuario-carrera asignado' })
    @ApiHeader({ name: 'apikey', required: true })
    @ApiHeader({ name: 'apisecret', required: true })
    @ApiBody({
    description: 'Actualizar el estado de titulación de usuario-carrera asignado. 1 es activo y 0 es inactivo',
    schema: {
        type: 'object',
        properties: {
        idUsuario: { type: 'number', example: 18 },
        idCarrera: { type: 'number', example: 1 },
        editarEstadoCarreraAsignada: { type: 'number', example: 1, description: '1 es activo y 0 es inactivo' },
        },
    },
    })
    async updateUsuarioCarreraTitulacionEditar(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body('idUsuario') idUsuario: number,
    @Body('idCarrera') idCarrera: number,
    @Body('editarEstadoCarreraAsignada') editarEstadoCarreraAsignada: number,
    ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.administracionService.updateUsuarioCarreraTitulacionEditar(idUsuario, idCarrera, editarEstadoCarreraAsignada);
    }



  @Get('estado-usuario/:idUsu')
  @ApiOperation({ summary: 'Obtener estado del usuario' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getUsuarioEstado(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('idUsu') idUsu: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.findUsuarioEstado(idUsu);
  }

  @Get('carreras')
  @ApiOperation({ summary: 'Obtener todas las carreras' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getAllCarreras(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.findAllCarreras();
  }

  @Get('rutas-por-rol/:idRol')
  @ApiOperation({ summary: 'Muestra las rutas asignadas a un rol con sus respectivos privilegios' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getRutasByRol(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('idRol') idRol: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.getRutasByRol(idRol);
  }


  @Get('usuarios-roles-estado')
  @ApiOperation({ 
    summary: 'Obtener usuarios con sus roles y estado', 
    description: "En 'Carreras' se está enviando el ID del usuario para que pueda ser usado en otro endpoint y obtenga las carreras asignadas a dicho usuario." 
  })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios con sus roles y estado',
    schema: {
        type: 'object',
        properties: {
        USU_ID: { type: 'integer', example: 1 },
        Nombre: { type: 'string', example: 'Juan Pérez' },
        Usuario: { type: 'string', example: 'jperez' },
        ROL_ID: { type: 'integer', example: 2 },
        ROL: { type: 'string', example: 'Administrador' },
        USU_ESTADO: { type: 'string', example: 'Activo' },
        Carreras: { 
            type: 'array', 
            items: { 
            type: 'integer', 
            example: 3, 
            description: "El endpoint retorna una etiqueta llamada 'Carreras', este hace referencia al ID del usuario para que pueda ser usado en otro endpoint y obtenga las carreras asignadas a dicho usuario." 
            }
        }
        }
    }
  })
  async getUsuariosConRolesYEstado(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.getUsuariosConRolesYEstado();
  }

    // En tu administracion.controller.ts

  @Get('rutas-padre')
  @ApiOperation({ summary: 'Obtener rutas de tipo Padre' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async getRutasPadre(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    return this.administracionService.findRutasPadre();
  }


  @Delete('elimina-ruta-rol/:idRolRuta')
  @ApiOperation({ summary: 'Elimina una ruta asignada a un rol' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  async deleteRutaByRolRutaId(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Param('idRolRuta') idRolRuta: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }
    await this.administracionService.deleteRutaByRolRutaId(idRolRuta);
    return { message: 'Ruta eliminada exitosamente' };
  }

  @Post('agregar-ruta-rol')
  @ApiOperation({ summary: 'Agregar una nueva ruta a un rol' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({
    description: 'Agregar una nueva ruta a un rol. 1 es editar, 0 es solo visualización',
    schema: {
      type: 'object',
      properties: {
        rolId: { type: 'number', example: 1, description: 'Id del Rol' },
        rutaId: { type: 'number', example: 2, description: 'Id de la Ruta' },
        rolrEliminado: { type: 'number', example: 0, description: 'Privilegio de edición: 1 es editar, 0 es solo visualización' },
      },
    },
  })
  async agregarRutaRol(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body('rolId') rolId: number,
    @Body('rutaId') rutaId: number,
    @Body('rolrEliminado') rolrEliminado: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.administracionService.agregarRutaRol(rolId, rutaId, rolrEliminado);
  }

  @Put('modificar-ruta-rol')
  @ApiOperation({ summary: 'Modificar privilegio de edición de una ruta asignada a un rol' })
  @ApiHeader({ name: 'apikey', required: true })
  @ApiHeader({ name: 'apisecret', required: true })
  @ApiBody({
    description: 'Permite modificar los privilegios de edición de una ruta asignada a un rol, donde 1 es edición y 0 es visualización',
    schema: {
      type: 'object',
      properties: {
        idRolRuta: { type: 'number', example: 1, description: 'Id de la relación entre Rol y Ruta' },
        estadoEdicion: { type: 'number', example: 1, description: 'Privilegio de edición: 1 es edición, 0 es visualización' },
      },
    },
  })
  async modificarRutaRol(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body('idRolRuta') idRolRuta: number,
    @Body('estadoEdicion') estadoEdicion: number,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.administracionService.modificarRutaRol(idRolRuta, estadoEdicion);
  }

  @Post('agregar-ruta')
  @ApiOperation({ summary: 'Agregar una nueva ruta' })
  @ApiConsumes('application/json')
  @ApiBody({ type: CreateRutaDto })
  async agregarRuta(
    @Headers('apikey') apiKey: string,
    @Headers('apisecret') apiSecret: string,
    @Body() createRutaDto: CreateRutaDto,
  ) {
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
        throw new HttpException('Invalid API key or secret', HttpStatus.UNAUTHORIZED);
    }

    return this.administracionService.createRuta(createRutaDto);
  }
}
