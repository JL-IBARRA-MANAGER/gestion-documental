import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UnidadAcademicaAdmin } from '../entities/unidad_academica_admin.entity';
import { SubUnidadAcademicaAdmin } from '../entities/sub_unidad_academica_admin.entity';
import { CuadroGeneralClasificacion } from '../entities/cuadro_general_clasificacion.entity';
import { DatoExpediente } from '../entities/dato_expediente.entity';
import { EstructuraOrganizacional } from '../entities/estructura_organizacional.entity';
import { GlobalDominios } from '../../biblioteca/entities/global_dominios.entity'; 

import { CreateClasificacionDocumentalDto } from '../dtos/create_clasificacion_documental.dto';
import { CreateDatoExpedienteDto } from '../dtos/create_dato_expediente.dto';

import { UpdateCuadroGeneralDto } from '../dtos/update-cuadro-general.dto'; // Importa el DTO aquí


import axios from 'axios';
import * as FormData from 'form-data';


@Injectable()
export class GestionArchivoService {


  private readonly remoteServerUrl = process.env.REMOTE_SERVER_URL;


  constructor(
    @InjectRepository(UnidadAcademicaAdmin)
    private unidadAcademicaAdminRepository: Repository<UnidadAcademicaAdmin>,
    @InjectRepository(SubUnidadAcademicaAdmin)
    private subUnidadAcademicaAdminRepository: Repository<SubUnidadAcademicaAdmin>,
    @InjectRepository(CuadroGeneralClasificacion)
    private cuadroGeneralClasificacionRepository: Repository<CuadroGeneralClasificacion>,
    @InjectRepository(DatoExpediente)
    private datoExpedienteRepository: Repository<DatoExpediente>,
    @InjectRepository(EstructuraOrganizacional)
    private estructuraOrganizacionalRepository: Repository<EstructuraOrganizacional>,
    @InjectRepository(GlobalDominios)  
    private globalDominiosRepository: Repository<GlobalDominios>,
  ) {}

  async getUnidadesAcademicasAdmin(idUsuario: number, idGAEO: number): Promise<any[]> {
    return this.unidadAcademicaAdminRepository.query(`
        SELECT DISTINCT
        ua."GUAA_ID", 
        ua."GUAA_NOMBRE", 
        ua."GUAA_RESPONSABLE",
        ua."GUAA_ORDEN"
        FROM 
        "tbl_gac_unidades_acad_admin" ua
        JOIN 
        "tbl_gac_sub_unidades_acad_admin" su ON ua."GUAA_ID" = su."GUAA_ID"
        JOIN 
        "tbl_gac_usuario_subunidad" us ON su."GSUA_ID" = us."GSUA_ID"
        WHERE 
        us."USU_ID" = $1
        AND ua."GAEO_ID" = $2
        AND ua."GUAA_ESTADO" = 1
        ORDER BY 
        ua."GUAA_ORDEN"
    `, [idUsuario, idGAEO]);
  }


  async getSubUnidadesAcademicasAdmin(idUsuario: number, idGUAA: number): Promise<any[]> {
    return this.subUnidadAcademicaAdminRepository.query(`
        SELECT 
        su."GSUA_ID", 
        su."GSUA_NOMBRE", 
        su."GSUA_RESPONSABLE"
        FROM 
        "tbl_gac_sub_unidades_acad_admin" su
        JOIN 
        "tbl_gac_usuario_subunidad" us ON su."GSUA_ID" = us."GSUA_ID"
        WHERE 
        us."USU_ID" = $1
        AND su."GUAA_ID" = $2
        AND su."GSUA_ESTADO" = 1
        ORDER BY 
        su."GSUA_ORDEN"
    `, [idUsuario, idGUAA]);
  }

  async getCuadroGeneral(idSubUnidad: number): Promise<any[]> {
    return this.cuadroGeneralClasificacionRepository.query(`
      SELECT 
        cg."CGCD_ID",
        su."GSUA_NOMBRE",
        cg."CGCD_SERIE_DOCUMENTAL",
        cg."CGCD_SUBSERIE_DOCUMENTAL",
        cg."CGCD_DESCRIPCION_SERIE",
        cg."CGCD_ORIGEN_DOCUMENTACION",
        cg."CGCD_CONDICIONES_ACCESO",
        cg."CGCD_NUM_EXPEDIENTES"
      FROM 
        "tbl_gac_cuadro_general_clasificacion" cg
      JOIN 
        "tbl_gac_sub_unidades_acad_admin" su ON su."GSUA_ID" = cg."GSUA_ID"
      WHERE 
        cg."GSUA_ID" = $1
        AND cg."CGCD_ESTADO" = 1
    `, [idSubUnidad]);
  }

  

 

  async actualizarCuadroGeneral(idCuadroGeneral: number, data: UpdateCuadroGeneralDto): Promise<void> {
    await this.cuadroGeneralClasificacionRepository.query(`
      UPDATE public.tbl_gac_cuadro_general_clasificacion
      SET
        "CGCD_SERIE_DOCUMENTAL" = $1,
        "CGCD_SUBSERIE_DOCUMENTAL" = $2,
        "CGCD_DESCRIPCION_SERIE" = $3,
        "CGCD_ORIGEN_DOCUMENTACION" = $4,
        "CGCD_CONDICIONES_ACCESO" = $5
      WHERE "CGCD_ID" = $6
    `, [
      data.CGCD_SERIE_DOCUMENTAL,
      data.CGCD_SUBSERIE_DOCUMENTAL,
      data.CGCD_DESCRIPCION_SERIE,
      data.CGCD_ORIGEN_DOCUMENTACION,
      data.CGCD_CONDICIONES_ACCESO,
      idCuadroGeneral,
    ]);
  }


  async getEstructuraOrganizacional(idUsuario: number): Promise<any[]> {
    return this.estructuraOrganizacionalRepository.query(`
      SELECT DISTINCT
        eo."GAEO_ID",
        eo."GAEO_NOMBRE",
        MIN(us."GUS_PRIVILEGIO") AS "GUS_PRIVILEGIO"
      FROM
        "tbl_gac_usuario_subunidad" us
      JOIN
        "tbl_gac_sub_unidades_acad_admin" su ON us."GSUA_ID" = su."GSUA_ID"
      JOIN
        "tbl_gac_unidades_acad_admin" ua ON su."GUAA_ID" = ua."GUAA_ID"
      JOIN
        "tbl_gac_estructura_organizacional" eo ON ua."GAEO_ID" = eo."GAEO_ID"
      WHERE
        us."USU_ID" = $1
        AND us."GUS_ESTADO" = 1
      GROUP BY
        eo."GAEO_ID", eo."GAEO_NOMBRE"
    `, [idUsuario]);
  }

  async getCuadroGeneralItem(idCuadroGeneral: number): Promise<any[]> {
    return this.cuadroGeneralClasificacionRepository.query(`
      SELECT 
        cg."CGCD_ID",
        cg."CGCD_SERIE_DOCUMENTAL",
        cg."CGCD_SUBSERIE_DOCUMENTAL",
        cg."CGCD_DESCRIPCION_SERIE",
        cg."CGCD_ORIGEN_DOCUMENTACION",
        cg."CGCD_CONDICIONES_ACCESO",
        cg."CGCD_NUM_EXPEDIENTES"
      FROM 
        "tbl_gac_cuadro_general_clasificacion" cg
      WHERE 
        cg."CGCD_ID" = $1
    `, [idCuadroGeneral]);
  }


  async getDatoExpediente(idCuadroGeneral: number): Promise<any> {
    const detalles = await this.datoExpedienteRepository.query(`
      SELECT 
        de."GDE_ID",
        de."CGCD_ID",
        de."GDE_NUM_EXPEDIENTE",
        de."GDE_FECHA_APERTURA",
        de."GDE_FECHA_CIERRE",
        de."GDE_VALOR_DOCUMENTAL",
        de."GDE_CONDICIONES_ACCESO",
        de."GDE_PLAZO_CONSERVACION",
        de."GDE_DESTINO_FINAL_CONSERVACION",
        de."GDE_DESTINO_FINAL_ELIMINACION",
        de."GDE_ARCHIVO",
        de."GDE_CAJA"
      FROM 
        "tbl_gac_dato_expediente" de
      WHERE 
        de."CGCD_ID" = $1
        AND de."GDE_ESTADO" = 1
    `, [idCuadroGeneral]);

    // Consultar el dominio
    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    return {
      detalles,
      dominio: dominio?.GDOM_DOMINIO,
      descripcion: dominio?.GDOM_DESCRIPCION,
    };

  }

  async insertarClasificacionDocumental(dto: CreateClasificacionDocumentalDto): Promise<void> {
    await this.cuadroGeneralClasificacionRepository.query(`
      INSERT INTO "tbl_gac_cuadro_general_clasificacion" (
        "GSUA_ID", 
        "CGCD_SERIE_DOCUMENTAL", 
        "CGCD_SUBSERIE_DOCUMENTAL", 
        "CGCD_DESCRIPCION_SERIE", 
        "CGCD_ORIGEN_DOCUMENTACION", 
        "CGCD_CONDICIONES_ACCESO", 
        "CGCD_NUM_EXPEDIENTES", 
        "USU_ID", 
        "CGCD_ESTADO"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, 0, null, 1
      )
    `, [
      dto.GSUA_ID, 
      dto.CGCD_SERIE_DOCUMENTAL, 
      dto.CGCD_SUBSERIE_DOCUMENTAL, 
      dto.CGCD_DESCRIPCION_SERIE, 
      dto.CGCD_ORIGEN_DOCUMENTACION, 
      dto.CGCD_CONDICIONES_ACCESO
    ]);
  }

 
  private generateFileName(originalName: string): string {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const randomString = Math.random().toString(36).substring(7);
    const extension = originalName.split('.').pop();
    return `${timestamp}-${randomString}.${extension}`;
  }

  private async uploadFileToRemoteServer(file: Express.Multer.File, remoteUploadUrl: string, fileName: string): Promise<void> {
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: fileName, contentType: file.mimetype });

    try {
      await axios.post(remoteUploadUrl, formData, {
        headers: formData.getHeaders(),
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false, 
        }),
      });
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

      
  async insertarDatoExpediente(dto: CreateDatoExpedienteDto, file?: Express.Multer.File): Promise<void> {
            let fileLink = dto.GDE_ARCHIVO;
      
            // Convertir los campos que deben ser números
            const CGCD_ID = Number(dto.CGCD_ID);
            const GDE_CONDICIONES_ACCESO = Number(dto.GDE_CONDICIONES_ACCESO);
            const GDE_VALOR_DOCUMENTAL = Number(dto.GDE_VALOR_DOCUMENTAL);
      
            if (file) {
        		const newFileName = this.generateFileName(file.originalname);
        		const remoteUploadUrl = `${this.remoteServerUrl}/index.php/dato_expediente`;
    
        		// Subir el archivo al servidor remoto
        		await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);
    
        		fileLink = `/public/dato_expediente/${newFileName}`;
            }
      
            await this.datoExpedienteRepository.query(`
            INSERT INTO "tbl_gac_dato_expediente" (
            "CGCD_ID", 
            "GDE_NUM_EXPEDIENTE", 
            "GDE_FECHA_APERTURA", 
            "GDE_FECHA_CIERRE", 
            "GDE_VALOR_DOCUMENTAL", 
            "GDE_CONDICIONES_ACCESO", 
            "GDE_PLAZO_CONSERVACION", 
            "GDE_DESTINO_FINAL_CONSERVACION", 
            "GDE_DESTINO_FINAL_ELIMINACION", 
            "GDE_ARCHIVO", 
            "GDE_CAJA"
            ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
            )
            `, [
            CGCD_ID, 
            dto.GDE_NUM_EXPEDIENTE, 
            dto.GDE_FECHA_APERTURA, 
            dto.GDE_FECHA_CIERRE, 
            GDE_VALOR_DOCUMENTAL, 
            GDE_CONDICIONES_ACCESO, 
            dto.GDE_PLAZO_CONSERVACION, 
            dto.GDE_DESTINO_FINAL_CONSERVACION, 
            dto.GDE_DESTINO_FINAL_ELIMINACION, 
            fileLink, 
            dto.GDE_CAJA
            ]);
  }
    
  async actualizarDatoExpediente(GDE_ID: number, dto: CreateDatoExpedienteDto, file?: Express.Multer.File): Promise<void> {
      let fileLink = dto.GDE_ARCHIVO;
    
      // Convertir los campos que deben ser números
      const GDE_CONDICIONES_ACCESO = Number(dto.GDE_CONDICIONES_ACCESO);
      const GDE_VALOR_DOCUMENTAL = Number(dto.GDE_VALOR_DOCUMENTAL);
    
      if (file) {
        const newFileName = this.generateFileName(file.originalname);
        const remoteUploadUrl = `${this.remoteServerUrl}/index.php/dato_expediente`;
    
        await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);
        fileLink = `/public/dato_expediente/${newFileName}`;
      }
    
      await this.datoExpedienteRepository.query(`
        UPDATE "tbl_gac_dato_expediente"
        SET 
          "GDE_NUM_EXPEDIENTE" = $1, 
          "GDE_FECHA_APERTURA" = $2, 
          "GDE_FECHA_CIERRE" = $3,
          "GDE_VALOR_DOCUMENTAL" = $4, 
          "GDE_CONDICIONES_ACCESO" = $5, 
          "GDE_PLAZO_CONSERVACION" = $6, 
          "GDE_DESTINO_FINAL_CONSERVACION" = $7, 
          "GDE_DESTINO_FINAL_ELIMINACION" = $8, 
          "GDE_ARCHIVO" = $9, 
          "GDE_CAJA" = $10
        WHERE "GDE_ID" = $11
      `, [
        dto.GDE_NUM_EXPEDIENTE,
        dto.GDE_FECHA_APERTURA,
        dto.GDE_FECHA_CIERRE,
        GDE_VALOR_DOCUMENTAL,
        GDE_CONDICIONES_ACCESO,
        dto.GDE_PLAZO_CONSERVACION,
        dto.GDE_DESTINO_FINAL_CONSERVACION,
        dto.GDE_DESTINO_FINAL_ELIMINACION,
        fileLink,
        dto.GDE_CAJA,
        GDE_ID
      ]);
   }
    
  async getReporteInventario(GSUA_ID: number): Promise<any[]> {
    return this.datoExpedienteRepository.query(`
      SELECT 
        ua."GUAA_NOMBRE",
        su."GSUA_NOMBRE",
        cg."CGCD_SERIE_DOCUMENTAL",
        cg."CGCD_SUBSERIE_DOCUMENTAL",
        de."GDE_CAJA", 
        de."GDE_NUM_EXPEDIENTE",
        de."GDE_DESTINO_FINAL_CONSERVACION",
        de."GDE_ZONA",
        de."GDE_ESTANTERIA",
        de."GDE_BANDEJA",
        de."GDE_OBSERVACION",
        cg."CGCD_DESCRIPCION_SERIE",
        de."GDE_FECHA_APERTURA",
        de."GDE_FECHA_CIERRE",
        de."GDE_VALOR_DOCUMENTAL",
        cg."CGCD_ORIGEN_DOCUMENTACION"
      FROM 
        public.tbl_gac_dato_expediente de
      JOIN 
        public.tbl_gac_cuadro_general_clasificacion cg ON de."CGCD_ID" = cg."CGCD_ID"
      JOIN 
        public.tbl_gac_sub_unidades_acad_admin su ON su."GSUA_ID" = cg."GSUA_ID"
      JOIN 
        public.tbl_gac_unidades_acad_admin ua ON ua."GUAA_ID" = su."GUAA_ID"
      WHERE 
        cg."GSUA_ID" = $1
        AND cg."CGCD_ESTADO" = 1
      ORDER BY 
        de."CGCD_ID", de."GDE_FECHA_APERTURA" DESC, de."GDE_NUM_EXPEDIENTE";
    `, [GSUA_ID]);
  }


  async deleteCuadroGeneralItem(CGCD_ID: number): Promise<void> {
    const result = await this.cuadroGeneralClasificacionRepository.query(`
      DELETE FROM public.tbl_gac_cuadro_general_clasificacion
      WHERE "CGCD_ID" = $1
    `, [CGCD_ID]);

    if (result.affected === 0) {
      throw new HttpException('Item not found or already deleted', HttpStatus.NOT_FOUND);
    }
  }

  async deleteDatoExpediente(GDE_ID: number): Promise<void> {
        const result = await this.datoExpedienteRepository.query(`
        DELETE FROM public.tbl_gac_dato_expediente
        WHERE "GDE_ID" = $1
        `, [GDE_ID]);

        if (result.affected === 0) {
            throw new HttpException('Expediente not found or already deleted', HttpStatus.NOT_FOUND);
        }
  }



}
