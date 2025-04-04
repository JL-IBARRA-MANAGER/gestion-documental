// src/vinculacion/services/vinculacion_datos.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VinculacionPracticaTipo } from '../entities/vinculacion_practica_tipo.entity';
import { VinculacionCineCampoAmplio } from '../entities/vinculacion_cine_campo_amplio.entity';
import { VinculacionCineCampoEspecifico } from '../entities/vinculacion_cine_campo_especifico.entity';
import { VinculacionCineCampoDetallado } from '../entities/vinculacion_cine_campo_detallado.entity';

import { CreatePracticaTipoDto } from '../dtos/create-practica-tipo.dto';
import { CreateCineCampoAmplioDto } from '../dtos/create-cine-campo-amplio.dto';
import { CreateCineCampoEspecificoDto } from '../dtos/create-cine-campo-especifico.dto';
import { CreateCineCampoDetalladoDto } from '../dtos/create-cine-campo-detallado.dto';

@Injectable()
export class VinculacionDatosService {
  constructor(
    @InjectRepository(VinculacionPracticaTipo)
    private vinculacionPracticaTipoRepository: Repository<VinculacionPracticaTipo>,
    @InjectRepository(VinculacionCineCampoAmplio)
    private vinculacionCineCampoAmplioRepository: Repository<VinculacionCineCampoAmplio>,
    @InjectRepository(VinculacionCineCampoEspecifico)
    private vinculacionCineCampoEspecificoRepository: Repository<VinculacionCineCampoEspecifico>,
    @InjectRepository(VinculacionCineCampoDetallado)
    private vinculacionCineCampoDetalladoRepository: Repository<VinculacionCineCampoDetallado>,
  ) {}


  // GET: Carreras asignadas al usuario con privilegios
    async findUsuarioCarreraPrivilegios(usuId: number): Promise<any[]> {
    const resultados = await this.vinculacionPracticaTipoRepository.query(
        `
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
            e."ROL_EDITAR",  
            a."USUCP_EDITAR",  
            v."VCPB_CODIGO",  
            v."VCPB_NOMBRE"  
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
        LEFT JOIN  
            public."tbl_vinculacion_codigo_programa_banner" v ON v."CAR_ID" = c."CAR_ID"  
        WHERE   
            b."USU_ID" = $1  
            AND a."USUCP_VINCULACION" = 1  
        ORDER BY   
            CASE   
                WHEN c."CAR_ACTIVA" = 'Sí' THEN 1  
                WHEN c."CAR_ACTIVA" = 'No' THEN 2  
                ELSE 3  
            END ASC,  
            c."CAR_NOMBRE" ASC,  
            c."CAR_PADREESC" ASC;  
        `,
        [usuId]
    );

    const procesados = resultados
        .filter((user) => user["CAR_CARRERA"] == 1)
        .map((user) => {
        const escuela = resultados.find(
            (padre) => padre["CAR_ID"] === user["CAR_PADREESC"]
        );
        return {
            "CAR_ID": user["CAR_ID"],
            "ESCUELA": escuela ? escuela["CAR_NOMBRE"] : null,
            //"CARRERA": user["CAR_NOMBRE"],
            "CODIGO": user["VCPB_CODIGO"] || null,
            "CARRERA": user["VCPB_NOMBRE"] || null, 
            "ACTIVA": user["CAR_ACTIVA"],
            "PRIVILEGIO": user["USUCP_EDITAR"],
        };
        });

    return procesados;
    }

  // GET: Tipos de prácticas activas
  async findActivePracticas(): Promise<VinculacionPracticaTipo[]> {
    return this.vinculacionPracticaTipoRepository.query(`
      SELECT "VINPT_ID", "VINPT_NOMBRE"
      FROM public."tbl_vinculacion_practica_tipo"
      WHERE "VINPT_ESTADO" = 1
    `);
  }

  // GET: Tipo de especificación, práctica / pasantía
  async findActiveEspecificaciones(): Promise<any[]> {
    return this.vinculacionPracticaTipoRepository.query(`
      SELECT "VINESP_ID", "VINESP_NOMBRE"
      FROM public."tbl_vinculacion_especificacion"
      WHERE "VINESP_ESTADO" = 1
    `);
  }

  // GET: Codificación CINE - Campo Amplio
  async findActiveCineCampoAmplio(): Promise<any[]> {
    return this.vinculacionCineCampoAmplioRepository.query(`
      SELECT "VCCA_ID", "VCCA_CODIGO", "VCCA_DESCRIPCION"
      FROM public."tbl_vinculacion_cine_campo_amplio"
      WHERE "VCCA_ESTADO" = 1
    `);
  }

  // GET: Codificación CINE - Campo Específico por idCampoAmplio
  async findCineCampoEspecificoByCampoAmplio(idCampoAmplio: number): Promise<any[]> {
    return this.vinculacionCineCampoAmplioRepository.query(`
      SELECT "VCCE_ID", "VCCE_CODIGO", "VCCE_DESCRIPCION"
      FROM public."tbl_vinculacion_cine_campo_especifico"
      WHERE "VCCA_ID" = $1 AND "VCCE_ESTADO" = 1
    `, [idCampoAmplio]);
  }


  // GET: Codificación CINE - Campo Detallado por idCampoEspecifico
  async findCineCampoDetalladoByCampoEspecifico(idCampoEspecifico: number): Promise<any[]> {
    return this.vinculacionCineCampoAmplioRepository.query(`
      SELECT "VCCD_ID", "VCCD_CODIGO", "VCCD_DESCRIPCION"
      FROM public."tbl_vinculacion_cine_campo_detallado"
      WHERE "VCCE_ID" = $1 AND "VCCD_ESTADO" = 1
    `, [idCampoEspecifico]);
  }

  // POST: Agregar tipo de práctica
  async createPracticaTipo(createPracticaTipoDto: CreatePracticaTipoDto) {
    const nuevaPractica = this.vinculacionPracticaTipoRepository.create({
      VINPT_NOMBRE: createPracticaTipoDto.VINPT_NOMBRE,
      VINPT_ESTADO: 1,  // Estado por defecto es 1 (activo)
    });
    return this.vinculacionPracticaTipoRepository.save(nuevaPractica);
  }


  // POST: Agregar un código CINE - Campo Amplio
  async createCineCampoAmplio(createCineCampoAmplioDto: CreateCineCampoAmplioDto) {
    const nuevoCineCampo = this.vinculacionCineCampoAmplioRepository.create({
      VCCA_CODIGO: createCineCampoAmplioDto.VCCA_CODIGO,
      VCCA_DESCRIPCION: createCineCampoAmplioDto.VCCA_DESCRIPCION,
      VCCA_ESTADO: 1,  // Por defecto en estado activo
    });
    return this.vinculacionCineCampoAmplioRepository.save(nuevoCineCampo);
  }


  // POST: Agregar un código CINE - Campo Específico
  async createCineCampoEspecifico(VCCA_ID: number, VCCE_CODIGO: string, VCCE_DESCRIPCION: string) {
    return this.vinculacionCineCampoAmplioRepository.query(`
      INSERT INTO public."tbl_vinculacion_cine_campo_especifico" ("VCCA_ID", "VCCE_CODIGO", "VCCE_DESCRIPCION", "VCCE_ESTADO")
      VALUES ($1, $2, $3, 1)
    `, [VCCA_ID, VCCE_CODIGO, VCCE_DESCRIPCION]);
  }


  // POST: Agregar un código CINE - Campo Detallado
  async createCineCampoDetallado(VCCE_ID: number, VCCD_CODIGO: string, VCCD_DESCRIPCION: string) {
    return this.vinculacionCineCampoAmplioRepository.query(`
      INSERT INTO public."tbl_vinculacion_cine_campo_detallado" ("VCCE_ID", "VCCD_CODIGO", "VCCD_DESCRIPCION", "VCCD_ESTADO")
      VALUES ($1, $2, $3, 1)
    `, [VCCE_ID, VCCD_CODIGO, VCCD_DESCRIPCION]);
  }

  // GET: Estados de un estudiante referente a una práctica o vinculación
  async getEstadosEstudiante(): Promise<any[]> {
    return this.vinculacionPracticaTipoRepository.query(`
      SELECT "VINPEE_ID", "VINPEE_NOMBRE" AS "Estado"
      FROM public.tbl_vinculacion_practica_estudiante_estados
    `);
  }


}
