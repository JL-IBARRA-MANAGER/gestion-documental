import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CreateTitulacionDto } from '../dtos/create-titulacion.dto';
import { UpdateSimilitudTitulacionDto } from '../dtos/update-similitud-titulacion.dto';

import { GlobalDominios } from '../../biblioteca/entities/global_dominios.entity';

import { UsuarioCarreraPrivilegios } from '../entities/usuario_carrera_privilegios.entity';
import { Titulacion_tbl } from '../entities/tbl_titulacion.entity';
import { TitulacionCarreraMalla } from '../entities/tbl_titulacion_carrera_malla.entity';

import { TitulacionDetalle } from '../entities/titulacion_detalle.entity';
import { RegistroNotasTrabajoDto } from '../dtos/registro-notas-trabajo.dto'

import { ModalidadTitulacion } from '../entities/tbl_modalida_titulacion.entity';
import { Malla } from '../entities/tbl_malla.entity';


import * as FormData from 'form-data';
import axios from 'axios';
import { Express } from 'express';



@Injectable()
export class TitulacionService {


  private readonly remoteServerUrl = process.env.REMOTE_SERVER_URL;

  constructor(
    @InjectRepository(UsuarioCarreraPrivilegios)
    private usuarioCarreraPrivilegiosRepository: Repository<UsuarioCarreraPrivilegios>,
    @InjectRepository(Titulacion_tbl)
    private readonly titulacionRepository: Repository<Titulacion_tbl>,
    @InjectRepository(TitulacionCarreraMalla)
    private titulacionCarreraMallaRepository: Repository<TitulacionCarreraMalla>,
    @InjectRepository(Malla)
    private mallaRepository: Repository<Malla>,
    @InjectRepository(ModalidadTitulacion)
    private modalidadTitulacionRepository: Repository<ModalidadTitulacion>,
    @InjectRepository(TitulacionDetalle)
    private readonly titulacionDetalleRepository: Repository<TitulacionDetalle>,
    @InjectRepository(GlobalDominios)
    private globalDominiosRepository: Repository<GlobalDominios>,
  ) {}

  async findTitulacionPrivilegios(usuId: number): Promise<any[]> {
    const resultados = await this.usuarioCarreraPrivilegiosRepository.query(
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
          a."USUCP_EDITAR"
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
          b."USU_ID" = $1
          AND a."USUCP_TITULACION" = 1
      ORDER BY 
          CASE 
              WHEN c."CAR_ACTIVA" = 'Sí' THEN 1
              WHEN c."CAR_ACTIVA" = 'No' THEN 2
              ELSE 3
          END ASC,
          c."CAR_PADREESC" ASC;
      `,
      [usuId],
    );

    const procesados = resultados
      .filter(user => user["CAR_CARRERA"] == 1)
      .map(user => {
        const escuela = resultados.find(padre => padre["CAR_ID"] === user["CAR_PADREESC"]);
        return {
          "CAR_ID": user["CAR_ID"],
          "ESCUELA": escuela ? escuela["CAR_NOMBRE"] : null,
          "CARRERA": user["CAR_NOMBRE"],
          "ACTIVA": user["CAR_ACTIVA"],
          "PRIVILEGIO": user["USUCP_EDITAR"],
        };
      });

    return procesados;
  }

  async findTitulacionByCarreraId(idCarrera: number): Promise<any> {
    const titulacion = await this.titulacionRepository.query(
      `
      SELECT 
        t."TITU_ID",
        t."TITU_CEDULA",
        t."TITU_NOMBRES",
        c."CAR_NOMBRE",
        m."MODT_NOMBRE",
        m."MODT_ID",
        ma."MALLA_NOMBRE",
        ma."MALLA_ID",
        t."TITU_SIMILITUD_INF",
        t."TITU_TITULO",
        t."TITU_FECHA_DEF",
        t."TITU_ESTADO",
        t."TITU_ARCHIVO",
        t."TITU_REGISTRO_TUTORIAS",
        t."TITU_BIBLIOTECA",
        t."TITU_BIBLIOTECA_URL",
        t."TITU_BIBLIOTECA_SENESCYT",
        t."TITU_BIBLIOTECA_PDF",
        t."TITU_BIBLIOTECA_DECLARACION",
        t."TITU_BIBLIOTECA_OBSERVACION"
      FROM 
        public."tbl_titulacion" t
      JOIN 
        public."tbl_carrera" c ON t."CAR_ID" = c."CAR_ID"
      JOIN 
        public."tbl_modalida_titulacion" m ON t."MODT_ID" = m."MODT_ID"
      JOIN 
        public."tbl_titulacion_malla" ma ON t."MALLA_ID" = ma."MALLA_ID"
      WHERE 
        t."CAR_ID" = $1
      ORDER BY 
        t."TITU_ID" DESC
      `,
      [idCarrera],
    );

    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    return {
      titulacion, // Retorna la titulación
      dominio: dominio?.GDOM_DOMINIO, // El dominio
      descripcion: dominio?.GDOM_DESCRIPCION, // La descripción
    };
  }

  async findMallaByCarreraId(idCarrera: number, idModalidad: number): Promise<any[]> {
    return this.titulacionCarreraMallaRepository.query(
      `
      SELECT 
        m."MALLA_ID",
        m."MALLA_NOMBRE"
      FROM 
        public."tbl_titulacion_carrera_malla" tcm
      JOIN 
        public."tbl_titulacion_malla" m ON tcm."MALLA_ID" = m."MALLA_ID"
      WHERE 
        tcm."CAR_ID" = $1
        AND tcm."MODT_ID" = $2
        AND tcm."TITCM_ESTADO" = 1
      `,
      [idCarrera, idModalidad],
    );
  }

  async findModalidades(): Promise<any[]> {
    return this.modalidadTitulacionRepository.query(
      `
      SELECT 
        "MODT_ID", 
        "MODT_NOMBRE" 
      FROM 
        public."tbl_modalida_titulacion" 
      WHERE 
        "MODT_ESTADO" = 1
      `
    );
  }

  async findTitulosByCarreraId(idCarrera: number): Promise<any[]> {
    return this.titulacionRepository.query(
      `
      SELECT 
        "CART_ID", 
        "CAR_ID", 
        "CART_TITULO"
      FROM 
        public.tbl_carrera_titulo
      WHERE 
        "CAR_ID" = $1
        AND "CART_ESTADO" = 1
      `,
      [idCarrera],
    );
  }

  async findModalidadesTitulacionByModalidadYMalla(idModalidadTitulacion: number, idMalla: number): Promise<any[]> {
    return this.titulacionRepository.query(
      `
      SELECT 
        "MODTD_ID", 
        "MODTD_NOMBRE",
        "MODTD_FORMULARIO"
      FROM 
        public."tbl_modalida_titulacion_det"
      WHERE 
        "MODT_ID" = $1
        AND "MALLA_ID" = $2
        AND "MODTD_ESTADO" = 1
      `,
      [idModalidadTitulacion, idMalla]
    );
  }

  async createTitulacion(createTitulacionDto: CreateTitulacionDto) {
    return this.titulacionRepository.save(createTitulacionDto);
  }


  private generateFileName(originalName: string): string {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const randomString = Math.random().toString(36).substring(7);
    const ext = originalName.split('.').pop();
    return `${timestamp}-${randomString}.${ext}`;
  }

  

 // Aquí comentamos la función de subida de archivos al servidor remoto.
  private async uploadFileToRemoteServer(file: Express.Multer.File, remoteUploadUrl: string, fileName: string): Promise<void> {
    // Comentar esta parte para desactivar la subida al servidor remoto
    /*
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: fileName, contentType: file.mimetype });

    try {
      await axios.post(remoteUploadUrl, formData, {
        headers: formData.getHeaders(),
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false, // Permite certificados no verificados, si es necesario
        }),
      });
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
    */
  }

  async registroNotasTrabajoCurricular(dto: RegistroNotasTrabajoDto, file: Express.Multer.File) {
    // Convierte los campos numéricos
    const TITU_ID = Number(dto.TITU_ID);
    const MODTD_ID = Number(dto.MODTD_ID);
    const TIPO_ID = Number(dto.TIPO_ID);
    const TITUD_NOTA_INF = dto.TITUD_NOTA_INF;

    // Sube el archivo al servidor remoto
    const generatedFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/titulacion`;

    await this.uploadFileToRemoteServer(file, remoteUploadUrl, generatedFileName);
    const fileLink = `/public/titulacion/${generatedFileName}`;

    // Guarda el detalle en la base de datos
    const newDetalle = this.titulacionDetalleRepository.create({
      TITU_ID,
      MODTD_ID,
      TITUD_TEMA: dto.TITUD_TEMA,
      TITUD_CEDULA_DOCENTE: dto.TITUD_CEDULA_DOCENTE,
      TITUD_DOCENTE: dto.TITUD_DOCENTE,
      TIPO_ID,
      TITUD_NOTA_INF: TITUD_NOTA_INF,
      TITUD_RESPALDO_INF: fileLink,
    });

    await this.titulacionDetalleRepository.save(newDetalle);

    try {
      await this.titulacionRepository.query(`
        UPDATE public.tbl_titulacion
        SET "TITU_ESTADO" = 2
        WHERE "TITU_ID" = $1
      `, [TITU_ID]);
    } catch (error) {
      console.error('Error al actualizar la titulación:', error);
    }


  }



  async getTipoDocentesTitulacion(): Promise<any[]> {
    return this.titulacionRepository.query(`
      SELECT "TIPO_ID", "TIPO_NOMBRE"
      FROM public.tbl_titulacion_tipo
      WHERE "TIPO_ESTADO" = 1
    `);
  }

  async getTipoDocentesTitulacionModalidad(MODT_ID: number): Promise<any[]> {
    return this.titulacionRepository.query(`
      SELECT tt."TIPO_ID", tt."TIPO_NOMBRE"
      FROM public.tbl_titulacion_tipo_modalidad ttm
      JOIN public.tbl_titulacion_tipo tt ON ttm."TIPO_ID" = tt."TIPO_ID"
      WHERE ttm."MODT_ID" = $1
      AND ttm."TIPOM_ESTADO" = 1
      AND tt."TIPO_ESTADO" = 1
    `, [MODT_ID]);
  }    
  
  async agregarDocumentoSimilitud(
    updateSimilitudDto: UpdateSimilitudTitulacionDto,
    file: Express.Multer.File,
  ): Promise<void> {
    const { TITU_ID } = updateSimilitudDto;

    // Genera un nombre de archivo único para el archivo recibido
    const generatedFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/plagio`;

    // Sube el archivo al servidor remoto
    await this.uploadFileToRemoteServer(file, remoteUploadUrl, generatedFileName);
    const fileLink = `/public/plagio/${generatedFileName}`;

    // Actualiza el registro en la base de datos
    await this.titulacionRepository.query(`
      UPDATE public.tbl_titulacion
      SET "TITU_SIMILITUD_INF" = $1
      WHERE "TITU_ID" = $2
    `, [fileLink, TITU_ID]);
  }

    async updateDocumentoSimilitud(
        updateSimilitudDto: UpdateSimilitudTitulacionDto,
        file: Express.Multer.File,
    ): Promise<void> {
        const { TITU_ID } = updateSimilitudDto;
    
        // Genera un nombre de archivo único para el archivo recibido
        const generatedFileName = this.generateFileName(file.originalname);
        const remoteUploadUrl = `${this.remoteServerUrl}/plagio`;
    
        // Sube el archivo al servidor remoto
        await this.uploadFileToRemoteServer(file, remoteUploadUrl, generatedFileName);
        const fileLink = `/public/plagio/${generatedFileName}`;
    
        // Actualiza el registro en la base de datos
        await this.titulacionRepository.query(`
        UPDATE public.tbl_titulacion
        SET "TITU_SIMILITUD_INF" = $1
        WHERE "TITU_ID" = $2
        `, [fileLink, TITU_ID]);
    }
  



}
