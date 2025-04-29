import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateRolUsuarioDto } from '../dtos/update-rol-usuario.dto';
import { CreateUsuarioCarreraPrivilegiosDto } from '../dtos/create-usuario-carrera-privilegios.dto';
import { CreateRutaDto } from '../dtos/create-ruta.dto';

import { MatrizGraduados } from '../entities/matriz_graduados.entity';
import { Usuario } from '../../login/usuario.entity';
import { RolUsuario } from '../../login/rol_usuario.entity';
import { RolRuta } from '../../login/rol_ruta.entity';
import { Ruta } from '../../login/ruta.entity';
import { UsuarioCarreraPrivilegios } from '../../titulacion/entities/usuario_carrera_privilegios.entity';
import { Rol } from '../entities/rol.entity';

import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { CreateUsuarioRolDto } from '../dtos/create-usuario-rol.dto';

import axios from 'axios';

@Injectable()
export class AdministracionService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol) private rolRepository: Repository<Rol>,
    @InjectRepository(RolUsuario) private rolUsuarioRepository: Repository<RolUsuario>,
    @InjectRepository(RolRuta) private rolRutaRepository: Repository<RolRuta>,
    @InjectRepository(Ruta) private rutaRepository: Repository<Ruta>,
    @InjectRepository(UsuarioCarreraPrivilegios) private usuarioCarreraRepository: Repository<UsuarioCarreraPrivilegios>,
    @InjectRepository(MatrizGraduados) private matrizGraduadosRepository: Repository<MatrizGraduados>,
  ) {}


    async registrarUsuario(createUsuarioDto: CreateUsuarioDto) {
        const { USU_NOMBRE, USU_APELLIDO, USU_USUARIO, Cedula } = createUsuarioDto;
    
        try {
        await this.usuarioRepository.query(
            `INSERT INTO public.tbl_usuarios ("USU_NOMBRE", "USU_APELLIDO", "USU_USUARIO", "USU_CONTRASENA", "USU_FECHA", "USU_ESTADO")
            VALUES ($1, $2, $3, $4, NOW(), $5)`,
            [USU_NOMBRE, USU_APELLIDO, USU_USUARIO, Cedula, 1],
        );
    
        return { message: 'Usuario registrado exitosamente' };
        } catch (error) {
        console.error('Error al registrar el usuario:', error); // Agrega el log
        throw new HttpException('Error al registrar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
  

 
  async buscarUsuario(username: string) {
    // Primero verifica si el usuario existe en la base de datos interna
    const usuario = await this.usuarioRepository.query(`
      SELECT "USU_ID", "USU_NOMBRE", "USU_APELLIDO", "USU_USUARIO"
      FROM public.tbl_usuarios
      WHERE "USU_USUARIO" = $1
      LIMIT 1
    `, [username]);

    // Si el usuario existe en la base de datos interna
    if (usuario.length > 0) {
      return {
        message: 'Usuario ya se encuentra registrado en la base de datos',
        bddInterna: 1,
        usuario: usuario[0],
      };
    }

    // Si no existe en la base de datos interna, consulta la API externa
    try {
      const externalApiResponse = await axios.get(
        `https://api.pucesi.edu.ec/Web-Services/api/search/${username}`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from('admin:65pT8HE9T4kQ').toString('base64')}`, // Codificación en Base64 para autenticación
          },
        }
      );

      // Retorna los datos de la API externa y marca `bddInterna` como 0
      return {
        ...externalApiResponse.data,
        bddInterna: 0,
      };
    } catch (error) {
      // Manejo de errores de la API externa, devuelve un error 400 si la API externa falla
      if (error.response && error.response.status === 400) {
        throw new HttpException('Usuario no encontrado en el directorio activo', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Error al consultar el directorio activo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async asignarRolUsuario(createUsuarioRolDto: CreateUsuarioRolDto) {
    const { ROL_ID, USU_ID } = createUsuarioRolDto;

    try {
      await this.rolUsuarioRepository.query(
        `INSERT INTO public.tbl_rol_usuario ("ROL_ID", "USU_ID", "ROLU_ESTADO")
         VALUES ($1, $2, $3)`,
        [ROL_ID, USU_ID, 1], // "ROLU_ESTADO" se establece en 1 por defecto
      );

      return { message: 'Rol asignado exitosamente al usuario' };
    } catch (error) {
      throw new HttpException('Error al asignar rol al usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findUserRoles(usuario: string) {
    return this.usuarioRepository.query(`
      SELECT 
	u."USU_ID", 
	u."USU_NOMBRE" AS USUARIO, 	
	r."ROL_NOBRE" AS "ROL", 
	rt."RUT_NOMBRE" AS "RUTA",
	ru."ROLU_ESTADO" AS "ESTADO ROL",
        rt."RUT_ESTADO" AS "ESTADO RUTA"
      FROM public."tbl_usuarios" u
      JOIN public."tbl_rol_usuario" ru ON u."USU_ID" = ru."USU_ID"
      JOIN public."tbl_rol_ruta" rr ON ru."ROL_ID" = rr."ROL_ID"
      JOIN public."tbl_rol" r ON r."ROL_ID" = rr."ROL_ID"
      JOIN public."tbl_rutas" rt ON rt."RUT_ID" = rr."RUT_ID"
      WHERE u."USU_USUARIO" = $1 AND rt."RUT_ESTADO" = 1 
    `, [usuario]);
  }

  async findAllRutas() {
    return this.rutaRepository.query(`
        SELECT 
        a."RUT_ID", 
        (SELECT b."RUT_NOMBRE" 
        FROM public."tbl_rutas" b 
        WHERE b."RUT_ID" = a."RUT_PADRE") AS "Nombre ruta padre", 
        a."RUT_NOMBRE" AS "Ruta", 
        a."RUT_RUTA", 
        a."RUT_PADRE",
        a."RUT_INDEXEDDB"
        FROM 
        public."tbl_rutas" a
        WHERE 
        a."RUT_ESTADO" = 1
    `);
  }

  async findUsuarioCarreraPrivilegios(idUsuario: number) {
    // Obtener los resultados de la consulta
    const resultados = await this.usuarioCarreraRepository.query(`
      SELECT 
        a."USUCP_ID", 
        a."USU_ID",
        v."VCPB_CODIGO", 
        v."VCPB_CODIGO" AS "CÓDIGO BANNER",    
        a."CAR_ID", 
        c."CAR_NOMBRE",
        c."CAR_CARRERA", 
        c."CAR_ESCUELA", 
        c."CAR_PADREESC", 
        c."CAR_ACTIVA", 
        c."CAR_ACTIVA_ESCUELA",
        a."USUCP_TITULACION", 
        a."USUCP_EDITAR",
	a."USUCP_ESTADO" 
      FROM 
        public."tbl_usuario_carrera_privilegios" a
      JOIN 
          public."tbl_carrera" c ON c."CAR_ID" = a."CAR_ID"
      LEFT JOIN   
          public."tbl_vinculacion_codigo_programa_banner" v ON v."CAR_ID" = a."CAR_ID"  
      WHERE a."USU_ID" = $1 
      ORDER BY c."CAR_PADREESC" DESC, c."CAR_NOMBRE" ASC
    `, [idUsuario]);

    // Realizar el procesamiento de los datos
    const procesados = resultados
      .filter(user => user["CAR_CARRERA"] == 1) // Filtra las carreras donde "CAR_CARRERA" == 1
      .map(user => {
        // Busca el padre correspondiente
        const padre = resultados.find(padre => padre["CAR_ID"] === user["CAR_PADREESC"]);

        return {
          "USUCP_ID": user["USUCP_ID"],
          "USU_ID": user["USU_ID"],
          "CÓDIGO BANNER": user["VCPB_CODIGO"],
          "CAR_ID": user["CAR_ID"],
          "ESCUELA": padre ? padre["CAR_NOMBRE"] : null,
          "CARRERA": user["CAR_NOMBRE"], 
          "ACTIVA": user["CAR_ACTIVA"],
          "CAR_ACTIVA_ESCUELA": user["CAR_ACTIVA_ESCUELA"],
          "TITULACIÓN": user["USUCP_TITULACION"],
          "EDITAR": user["USUCP_EDITAR"],
          "ESTADO": user["USUCP_ESTADO"]
        };
      });

    return procesados;
  }


  async findUsuarioCarreraPrivilegiosByUsuario(usuario: string) {
    // Ejecutar la consulta para obtener los privilegios del usuario
    const resultados = await this.usuarioCarreraRepository.query(`
      SELECT 
        a."USUCP_ID", 
        a."USU_ID",  
        v."VCPB_CODIGO",  
        a."CAR_ID", 
        c."CAR_NOMBRE",
        c."CAR_CARRERA", 
        c."CAR_ESCUELA", 
        c."CAR_PADREESC", 
        c."CAR_ACTIVA", 
        c."CAR_ACTIVA_ESCUELA",
        a."USUCP_TITULACION", 
        a."USUCP_EDITAR",
        a."USUCP_ESTADO"
      FROM 
        public."tbl_usuario_carrera_privilegios" a
      JOIN 
        public."tbl_carrera" c ON c."CAR_ID" = a."CAR_ID"
      JOIN 
        public."tbl_usuarios" d ON d."USU_ID" = a."USU_ID"
      LEFT JOIN   
        public."tbl_vinculacion_codigo_programa_banner" v ON v."CAR_ID" = a."CAR_ID"  
      WHERE 
        d."USU_USUARIO" = $1::text  -- Cast para asegurar que es de tipo texto
      ORDER BY 
        c."CAR_PADREESC" DESC, 
        c."CAR_NOMBRE" ASC
    `, [usuario]);

    // Procesar los resultados
    const procesados = resultados
      .filter(user => user["CAR_CARRERA"] == 1) // Filtrar las carreras donde "CAR_CARRERA" == 1
      .map(user => {
        // Busca el padre correspondiente
        const padre = resultados.find(padre => padre["CAR_ID"] === user["CAR_PADREESC"]);

        return {
          "USUCP_ID": user["USUCP_ID"],
          "USU_ID": user["USU_ID"],
          "CÓDIGO BANNER": user["VCPB_CODIGO"],
          "CAR_ID": user["CAR_ID"],
          "ESCUELA": padre ? padre["CAR_NOMBRE"] : null,
          "CARRERA": user["CAR_NOMBRE"], 
          "ACTIVA": user["CAR_ACTIVA"],
          "CAR_ACTIVA_ESCUELA": user["CAR_ACTIVA_ESCUELA"],
          "TITULACIÓN": user["USUCP_TITULACION"],
          "EDITAR": user["USUCP_EDITAR"],
          "ESTADO": user["USUCP_ESTADO"]
        };
      });

    return procesados;
  }


  
    async createUsuarioCarreraPrivilegio(data: CreateUsuarioCarreraPrivilegiosDto): Promise<UsuarioCarreraPrivilegios> {
    // Verificar si ya existe un registro con el mismo USU_ID y CAR_ID
    const existingPrivilegio = await this.usuarioCarreraRepository.findOne({
        where: { USU_ID: data.USU_ID, CAR_ID: data.CAR_ID },
    });

    if (existingPrivilegio) {
        throw new HttpException('Esta carrera ya existe para este usuario', HttpStatus.CONFLICT);
    }

    // Buscar el valor de CAR_PADREESC en la tabla tbl_carrera cuando CAR_ID = data.CAR_ID
    const carrera = await this.usuarioCarreraRepository.query(`
        SELECT "CAR_PADREESC" 
        FROM public.tbl_carrera 
        WHERE "CAR_ID" = $1
    `, [data.CAR_ID]);

    const carPadreEsc = carrera.length ? carrera[0].CAR_PADREESC : null;

    if (carPadreEsc) {
        // Verificar si ya existe un registro con el mismo USU_ID y CAR_PADREESC
        const existingPadrePrivilegio = await this.usuarioCarreraRepository.findOne({
        where: { USU_ID: data.USU_ID, CAR_ID: carPadreEsc },
        });

        if (!existingPadrePrivilegio) {
        // Crear y guardar el registro para CAR_PADREESC si no existe
        const newPadrePrivilegio = this.usuarioCarreraRepository.create({
            USU_ID: data.USU_ID,
            CAR_ID: carPadreEsc,
            USUCP_TITULACION: data.USUCP_TITULACION,
            USUCP_EDITAR: data.USUCP_EDITAR,
        });
        await this.usuarioCarreraRepository.save(newPadrePrivilegio);
        }
    }

    // Crear y guardar el registro para CAR_ID
    const newPrivilegio = this.usuarioCarreraRepository.create(data);
    return this.usuarioCarreraRepository.save(newPrivilegio);
    }

  async findGraduadosByCarreraId(idCarrera: number) {
    return this.matrizGraduadosRepository.query(`
      SELECT 
        "MAGR_ID", "MAGR_NUMERO", "MAGR_CODDIGO_CARRERA", "MAGR_INSTITUCION", "MAGR_CARRERA",
        "MAGR_LUGAR", "MAGR_DURACION", "MAGR_NIVEL", "MAGR_MODALIDAD", "MAGR_NUMERO_MATRICULA",
        "MAGR_TIPO_IDENTIFICACION", "MAGR_CEDULA", "MAGR_NOMBRES", "MAGR_SEXO", "MAGR_NACIONALIDAD",
        "MAGR_FECHA_INICIO_ESTUDIOS", "MAGR_FECHA_EGRESAMIENTO", "MAGR_TITULO_ADMISION", 
        "MAGR_PROCEDENCIA_TITULO_ADMISION", "MAGR_FECHA_ACTA_GRADO", "MAGR_NUMERO_ACTA_GRADO", 
        "MAGR_DENOMINACION_TITULO", "MAGR_FECHA_REFRENDACION", "MAGR_NUMERO_REFRENDACION", 
        "MAGR_TEMA_DE_TESIS", "MAGR_NUMERO_CEDULA_ASESORES", "MAGR_ASESORES", "MAGR_LECTOR1", 
        "MAGR_LECTOR2", "MAGR_DIRECCIONES", "MAGR_TELEFONO", "MAGR_MAIL", "MAGR_ETNIA", 
        "MAGR_PAIS_NACIONALIDAD", "MAGR_PAIS_RESIDENCIA", "MAGR_PROVINCIA_RECIDENCIA", 
        "MAGR_CANTON_RESIDENCIA", "MAGR_TIPO_DE_COLEGIO", "MAGR_ESTUDIOS_PREVIOS", 
        "MAGR_UNIVERSIDAD_ESTUDIOS_PREVIOS", "MAGR_CARRERA_ESTUDIOS_PREVIOS", 
        "MAGR_TIEMPO_ESTUDIOS_RECONOCIMIENTO", "MAGR_TIPO_RECONOCIMIENTO", "MAGR_MECANISMO_TITULACION", 
        "MAGR_NOTA_PROMEDIO_ACUMULADO", "MAGR_NOTA_TRABAJO_TITULACION", "MAGR_NOTA_FINAL", 
        "MAGR_RESPALDOS", "MAGR_EXPEDIENTE", "MAGR_OBSERVACION", "CAR_ID", "MAGR_ANALISIS"
      FROM public."tbl_matriz_graduados"
      WHERE "CAR_ID" = $1
    `, [idCarrera]);
  }

  async actualizarEstadoUsuario(idUsu: number, estado: number) {
    return this.usuarioRepository.query(
      `UPDATE public."tbl_usuarios" 
      SET "USU_ESTADO" = $1 
      WHERE "USU_ID" = $2`,
      [estado, idUsu],
    );
  }

  async findAllRoles() {
    return this.rolRepository.query(`
      SELECT "ROL_ID", "ROL_NOBRE", "ROL_EDITAR"
      FROM public."tbl_rol"
      WHERE "ROL_ESTADO" = 1
    `);
  }

  async updateRolUsuario(idUsu: number, updateDto: UpdateRolUsuarioDto) {
    const { rolId, estado } = updateDto;

    return this.rolUsuarioRepository.query(
      `UPDATE public."tbl_rol_usuario"
      SET "ROL_ID" = $1, "ROLU_ESTADO" = $2
      WHERE "USU_ID" = $3`,
      [rolId, estado, idUsu],
    );
  }

  async updateUsuarioEstado(idUsu: number, estado: number) {
    return this.usuarioRepository.query(`
      UPDATE public."tbl_usuarios"
      SET "USU_ESTADO" = $1
      WHERE "USU_ID" = $2
    `, [estado, idUsu]);
  }

  async findUsuarioEstado(idUsu: number) {
    try {
      return await this.usuarioRepository.query(`
        SELECT 
          "USU_ID", 	
          "USU_NOMBRE", 
          "USU_APELLIDO", 
          "USU_USUARIO", 
          "USU_FECHA", 
          "USU_ESTADO"
        FROM 
          public."tbl_usuarios"
        WHERE 
          "USU_ID" = $1
      `, [idUsu]);
    } catch (error) {
      throw new HttpException('Error al procesar la solicitud', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllCarreras(): Promise<any[]> {
    return this.usuarioCarreraRepository.query(`
      SELECT 
        "CAR_ID", 
        "CTIP_ID", 
        "CAR_CODIGO", 
        "CAR_NOMBRE", 
        "CAR_CARRERA", 
        "CAR_ESCUELA", 
        "CAR_PADREESC", 
        "CAR_ACTIVA", 
        "CAR_ACTIVA_ESCUELA", 
        "CAR_CAMPUS", 
        "CAR_ESTADO", 
        "CMOD_ID", 
        "SEDE_ID"
      FROM 
        public."tbl_carrera"
      WHERE 
        "CAR_CARRERA" = 1
    `);
  }

  async updateUsuarioCarreraEstado(idUsuario: number, idCarrera: number, estadoCarreraAsignada: number): Promise<void> {
        await this.usuarioCarreraRepository.query(
            `UPDATE public."tbl_usuario_carrera_privilegios"
            SET "USUCP_ESTADO" = $1
            WHERE "USU_ID" = $2 AND "CAR_ID" = $3`,
            [estadoCarreraAsignada, idUsuario, idCarrera]
        );
  }

  async updateUsuarioCarreraEditarEstado(idUsuario: number, idCarrera: number, editarEstadoCarreraAsignada: number): Promise<void> {
        await this.usuarioCarreraRepository.query(
            `UPDATE public."tbl_usuario_carrera_privilegios"
            SET "USUCP_EDITAR" = $1
            WHERE "USU_ID" = $2 AND "CAR_ID" = $3`,
            [editarEstadoCarreraAsignada, idUsuario, idCarrera]
        );
  }

  async updateUsuarioCarreraTitulacionEditar(idUsuario: number, idCarrera: number, editarEstadoCarreraAsignada: number): Promise<void> {
       await this.usuarioCarreraRepository.query(
       	 `UPDATE public."tbl_usuario_carrera_privilegios"
        	SET "USUCP_TITULACION" = $1
        	WHERE "USU_ID" = $2 AND "CAR_ID" = $3`,
        	[editarEstadoCarreraAsignada, idUsuario, idCarrera]
       );
  }

  async getRutasByRol(idRol: number): Promise<any[]> {
    return this.rolRutaRepository.query(`
        SELECT 
        a."ROLR_ID",
        a."RUT_ID",
        (SELECT c."RUT_NOMBRE" 
        FROM public."tbl_rutas" c 
        WHERE c."RUT_ID" = b."RUT_PADRE") AS "Nombre ruta padre",
        b."RUT_NOMBRE" AS "Ruta",
        a."ROLR_ELIMINADO" AS "Privilegio de edición"
        FROM 
        public."tbl_rol_ruta" a
        JOIN 
        public."tbl_rutas" b ON a."RUT_ID" = b."RUT_ID"
        WHERE 
        a."ROL_ID" = $1
    `, [idRol]);
  }


  async getUsuariosConRolesYEstado() {
    return this.usuarioRepository.query(`
      SELECT 
        a."USU_NOMBRE" AS "Nombre", 
        a."USU_USUARIO" AS "Usuario", 
        c."ROL_NOBRE" AS "ROL", 
        a."USU_ESTADO" AS "Estado",
        a."USU_ID" AS "Carreras"
      FROM 
        public."tbl_usuarios" a
      JOIN 
        public."tbl_rol_usuario" b ON a."USU_ID" = b."USU_ID"
      JOIN 
        public."tbl_rol" c ON b."ROL_ID" = c."ROL_ID"
      ORDER BY 
	a."USU_NOMBRE" ASC
    `);
  }

  async deleteRutaByRolRutaId(idRolRuta: number): Promise<void> {
    await this.rolRutaRepository.query(`
      DELETE FROM public."tbl_rol_ruta"
      WHERE "ROLR_ID" = $1
    `, [idRolRuta]);
  }

  async agregarRutaRol(rolId: number, rutaId: number, rolrEliminado: number): Promise<void> {
    await this.rolRutaRepository.query(
      `INSERT INTO public."tbl_rol_ruta" ("ROL_ID", "RUT_ID", "ROLR_ELIMINADO")
       VALUES ($1, $2, $3)`,
      [rolId, rutaId, rolrEliminado]
    );
  }

  async modificarRutaRol(idRolRuta: number, estadoEdicion: number): Promise<void> {
    await this.rolRutaRepository.query(
      `UPDATE public."tbl_rol_ruta"
       SET "ROLR_ELIMINADO" = $1
       WHERE "ROLR_ID" = $2`,
      [estadoEdicion, idRolRuta]
    );
  }

  async createRuta(createRutaDto: CreateRutaDto) {
    const { nombreRuta, rutRuta, idRutaPadre, datosParaAutocompletado } = createRutaDto;

    // Transformar la ruta a minúsculas
    const rutaTransformada = rutRuta.toLowerCase();

    // Generar el valor de `RUT_PATH_URL`
    const rutPathUrl = `/${rutaTransformada}`;

    let cleanRutRuta: string;

    // Si el idRutaPadre es diferente de 0, obtener el RUT_RUTA del padre
    if (idRutaPadre !== 0) {
        const rutaPadre = await this.rutaRepository.query(`
        SELECT "RUT_RUTA" 
        FROM public.tbl_rutas 
        WHERE "RUT_ID" = $1 
        LIMIT 1
        `, [idRutaPadre]);

        if (rutaPadre.length === 0) {
        throw new Error(`No se encontró una ruta padre con el ID: ${idRutaPadre}`);
        }

        // Usamos la ruta del padre para generar `cleanRutRuta`
        cleanRutRuta = rutaPadre[0].RUT_RUTA.replace(/-/g, '');
    } else {
        // Si no tiene padre, usar la ruta actual
        cleanRutRuta = rutaTransformada.replace(/-/g, '');
    }

    // Generar el valor de `RUT_IMPORT_COMPONENT`
    const rutImportComponent = `/modules/${cleanRutRuta}/pages/${capitalizeWords(rutRuta)}Page.vue`;

    // Crear un nuevo registro en la base de datos
    const nuevaRuta = this.rutaRepository.create({
        RUT_NOMBRE: nombreRuta,
        RUT_RUTA: rutaTransformada,
        RUT_PADRE: idRutaPadre,
        RUT_PATH_URL: rutPathUrl,
        RUT_IMPORT_COMPONENT: rutImportComponent,
        RUT_INDEXEDDB: datosParaAutocompletado,
        RUT_ESTADO: 1, // Asignamos un valor por defecto
    });

    // Guardar la nueva ruta
    return this.rutaRepository.save(nuevaRuta);
  }


  async findRutasPadre() {
    return this.rutaRepository.query(`
        SELECT "RUT_ID", "RUT_NOMBRE"
        FROM public.tbl_rutas
        WHERE "RUT_ESTADO" = 1 AND "RUT_PADRE" = 0
    `);
  }


}

// Función para capitalizar cada palabra separada por un guion
function capitalizeWords(text: string): string {
  return text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

// Función para capitalizar palabras
function capitalize(text: string) {
  return text.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}
