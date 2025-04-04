// src/alumni/services/alumni.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsuarioCarreraPrivilegios } from '../../titulacion/entities/usuario_carrera_privilegios.entity';
import { Usuario } from '../../titulacion/entities/usuario.entity';
import { Carrera } from '../../titulacion/entities/carrera.entity';
import { Rol } from '../../titulacion/entities/rol.entity';
import { RolUsuario } from '../../titulacion/entities/rol_usuario.entity';
import { Titulacion_tbl } from '../../titulacion/entities/tbl_titulacion.entity';


@Injectable()
export class AlumniService {
  constructor(
    @InjectRepository(Titulacion_tbl)
    private titulacionRepository: Repository<Titulacion_tbl>,  // Declara el repositorio correcto
    @InjectRepository(UsuarioCarreraPrivilegios)
    private usuarioCarreraPrivilegiosRepository: Repository<UsuarioCarreraPrivilegios>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Carrera)
    private carreraRepository: Repository<Carrera>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
    @InjectRepository(RolUsuario)
    private rolUsuarioRepository: Repository<RolUsuario>,
  ) {}


  async getUsuarioCarreraPrivilegios(usuId: number): Promise<any[]> {
    const resultados = await this.usuarioCarreraPrivilegiosRepository.query(`
      SELECT 
          c."CAR_NOMBRE", 
          c."CAR_ID", 
          c."CAR_ACTIVA", 
          c."CAR_ESCUELA", 
          c."CAR_PADREESC", 
          c."CAR_CARRERA", 
          c."CAR_ESTADO",
          c."CAR_ACTIVA_ESCUELA", 
          e."ROL_NOBRE",  
          e."ROL_EDITAR"
      FROM 
          public."tbl_usuario_carrera_privilegios" a
      JOIN 
          public."tbl_usuarios" b ON b."USU_ID" = a."USU_ID"
      JOIN 
          public."tbl_carrera" c ON c."CAR_ID" = a."CAR_ID"
      LEFT JOIN
          public."tbl_carrera" c2 ON c."CAR_PADREESC" = c2."CAR_ID"
      JOIN 
          public."tbl_rol_usuario" d ON d."USU_ID" = a."USU_ID"
      JOIN 
          public."tbl_rol" e ON e."ROL_ID" = d."ROL_ID"
      WHERE 
          b."USU_ID" = $1 AND a."USUCP_ESTADO" = 1
      ORDER BY 
          CASE 
              WHEN c."CAR_ACTIVA" = 'Sí' THEN 1
              WHEN c."CAR_ACTIVA" = 'No' THEN 2
              ELSE 3
          END ASC,
          c."CAR_PADREESC"  DESC, c."CAR_NOMBRE" ASC;
    `, [usuId]);

    const procesados = resultados
      .filter(user => user["CAR_CARRERA"] == 1)
      .map(user => {
        const padre = resultados.find(padre => padre["CAR_ID"] === user["CAR_PADREESC"]);
        return {
          "CAR_ID": user["CAR_ID"],
          "ESCUELA": padre ? padre["CAR_NOMBRE"] : null, 
          "CARRERA": user["CAR_NOMBRE"], 
          "ESTADO": user["CAR_ESTADO"],
          "ACTIVA": user["CAR_ACTIVA"]
        };
      });

    return procesados;
  }

  async getDatosCarrera(idCarrera: number): Promise<any> {
    const resultados = await this.usuarioCarreraPrivilegiosRepository.query(`
      SELECT 
        "CART_TITULO" AS "Título", 
        "CART_DURACION" AS "Duración", 
        "CART_NIVEL" AS "Nivel", 
        "CART_MODALIDAD" AS "Modalidad", 
        "CART_LUGAR" AS "Lugar"
      FROM 
        public.tbl_carrera_titulo
      WHERE 
        "CAR_ID" = $1
    `, [idCarrera]);

    return resultados.length > 0 ? resultados[0] : null;
  }

    async getDatosEstudianteTitulacion(identificacion: string, idCarrera: number): Promise<any> {
        const result = await this.titulacionRepository.query(`
            SELECT 
            a."TITU_ID", 
            a."TITU_CEDULA" AS "Identificación", 
            a."TITU_NOMBRES" AS "Nombres", 
            c."MODT_NOMBRE" AS "Modalidad de titulación",
            (SELECT b."TITUD_TEMA" 
                FROM public."tbl_titulacion_detalle" b 
                WHERE b."TITU_ID" = a."TITU_ID" AND b."TIPO_ID" = 0
                LIMIT 1) AS "Tema de tesis",
            (SELECT b."TITUD_CEDULA_DOCENTE" 
                FROM public."tbl_titulacion_detalle" b 
                WHERE b."TITU_ID" = a."TITU_ID" AND b."TIPO_ID" = 1
                LIMIT 1) AS "Cédula asesor",
            (SELECT b."TITUD_DOCENTE" 
                FROM public."tbl_titulacion_detalle" b 
                WHERE b."TITU_ID" = a."TITU_ID" AND b."TIPO_ID" = 1
                LIMIT 1) AS "Asesor",
            (SELECT b."TITUD_DOCENTE" 
                FROM public."tbl_titulacion_detalle" b 
                WHERE b."TITU_ID" = a."TITU_ID" AND b."TIPO_ID" = 2
                LIMIT 1) AS "Lector 1",
            (SELECT b."TITUD_DOCENTE" 
                FROM public."tbl_titulacion_detalle" b 
                WHERE b."TITU_ID" = a."TITU_ID" AND b."TIPO_ID" = 4
                LIMIT 1) AS "Lector 2"
            FROM 
            public."tbl_titulacion" a
            JOIN 
            public."tbl_modalida_titulacion" c ON a."MODT_ID" = c."MODT_ID"
            WHERE 
            a."TITU_CEDULA" = $1
            AND a."CAR_ID" = $2
        `, [identificacion, idCarrera]);

        return result;
    }

}
