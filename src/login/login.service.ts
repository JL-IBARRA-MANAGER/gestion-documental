import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Usuario } from './usuario.entity';
import { RolUsuario } from './rol_usuario.entity';
import { RolRuta } from './rol_ruta.entity';
import { Ruta } from './ruta.entity';
import axios from 'axios';

@Injectable()
export class LoginService {
  constructor(
    private dataSource: DataSource, 
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
    @InjectRepository(RolUsuario) private rolUsuarioRepository: Repository<RolUsuario>,
    @InjectRepository(RolRuta) private rolRutaRepository: Repository<RolRuta>,
    @InjectRepository(Ruta) private rutasRepository: Repository<Ruta>,
  ) {}


  async validateUser(username: string, password: string, apiKey: string, apiSecret: string) {
    // Validación de API Key y API Secret
    if (apiKey !== process.env.API_KEY || apiSecret !== process.env.API_SECRET) {
      return { success: false, message: 'Invalid credentials' };
    }

    try {
      // Llamada a la API externa con autenticación básica
      const externalApiResponse = await axios.post(
        'https://api.pucesi.edu.ec/Web-Services/api/auth/data',
        { usuario: username, password: password },
        {
          headers: {
            Authorization: `Basic ${Buffer.from('admin:65pT8HE9T4kQ').toString('base64')}`, // Codificación en Base64 para autenticación
          },
        }
      );

      // Log de la respuesta de la API externa
      console.log('External API Response:', externalApiResponse.data);

      // Verifica si la respuesta de la API externa contiene los datos esperados
      if (externalApiResponse.data && externalApiResponse.data.nombres) {
        let localUsername = username; // Mantén el valor original de username

        // Verifica si uno de los grupos es "EstudiantesInscritos" o "Estudiantes"
        if (externalApiResponse.data.grupos.includes('EstudiantesInscritos') || externalApiResponse.data.grupos.includes('Estudiantes')) {
          // Buscar al usuario en la base de datos local usando el username original
          const user = await this.usuariosRepository.findOne({ where: { USU_USUARIO: username } });

          // Si no encuentra el usuario en la base de datos local, asignar "estudiante" al localUsername
          if (!user) {
            localUsername = 'estudiante';
          }
        }

        // Buscar al usuario en la base de datos local usando el localUsername actualizado
        const userQuery = await this.dataSource.query(
          `SELECT "USU_ID", "USU_NOMBRE", "USU_USUARIO" 
          FROM public.tbl_usuarios 
          WHERE "USU_USUARIO" = $1 
          LIMIT 1`, 
          [localUsername]
        );

        // Verifica si la consulta devolvió resultados
        if (userQuery.length === 0) {
          // Si no encuentra el usuario en la base de datos local, devuelve solo los datos de la API externa
          return {
            success: true,
            nombres: externalApiResponse.data.nombres,
            cedula: externalApiResponse.data.cedula,
            correo: externalApiResponse.data.correo,
            grupos: externalApiResponse.data.grupos,
            successInterna: false,
            message: 'User found in external API, but not in local database',
          };
        }

        // Extrae la información del usuario
        const user = userQuery[0];

        console.log(user);


      // Si encuentra al usuario en la base de datos local, realiza la consulta para obtener el rol
      const rolUsuarioQuery = await this.dataSource.query(
        `SELECT "ROL_ID" 
        FROM public.tbl_rol_usuario 
        WHERE "USU_ID" = $1 
        LIMIT 1`, 
        [user.USU_ID]
      );

      // Si la consulta devuelve un resultado, extraemos el rolId
      const rolId = rolUsuarioQuery.length > 0 ? rolUsuarioQuery[0].ROL_ID : null;

	console.log(rolId);

        return {
          success: true,
          usuId: user.USU_ID,
          nombre: user.USU_NOMBRE,
          rolId: rolId,
          nombres: externalApiResponse.data.nombres,
          cedula: externalApiResponse.data.cedula,
          correo: externalApiResponse.data.correo,
          grupos: externalApiResponse.data.grupos,
        };
      } else {
        // Si la API externa devuelve credenciales inválidas
        return { success: false, message: 'Invalid credentials from external API' };
      }
    } catch (error) {
      // Manejo de errores de la API externa
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized - Invalid credentials for external API');
        return { success: false, message: 'Invalid external credentials' };
      }

      // Log y manejo de cualquier otro error
      console.error('Error during login:', error);
      throw new Error('Internal server error');
    }
  }



  async getUserRutas(rolId: number) {
      try {
        const rutas = await this.usuariosRepository.query(`
          SELECT DISTINCT d."RUT_ID", d."RUT_NOMBRE", d."RUT_RUTA", d."RUT_PATH_URL", d."RUT_IMPORT_COMPONENT", d."RUT_INDEXEDDB", c."ROLR_ELIMINADO", d."RUT_PADRE"
          FROM public."tbl_rutas" d
          INNER JOIN public."tbl_rol_ruta" c ON c."RUT_ID" = d."RUT_ID"
          WHERE c."ROL_ID" = $1
	  ORDER BY "RUT_NOMBRE" ASC
        `, [rolId]);

        
        const rutasFormateadas = rutas.map(ruta => ({
          id: ruta.RUT_ID,
          nombre: ruta.RUT_NOMBRE,
          path: ruta.RUT_PATH_URL,
          ruta: ruta.RUT_RUTA,
          component: ruta.RUT_IMPORT_COMPONENT,
	  indexeddb: ruta.RUT_INDEXEDDB,
          privilegio: ruta.ROLR_ELIMINADO,
          padre: ruta.RUT_PADRE,
        }));

        

        return {
          success: true,
          rutas: rutasFormateadas,
        };
      } catch (error) {
        console.error('Error during getUserRutas:', error);
        throw new Error('Internal server error');
      }
  }


}
