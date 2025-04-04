import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { Repository } from 'typeorm';

import { ExpedienteAcademico } from '../entities/expediente_academico.entity';
import { GlobalDominios } from '../../biblioteca/entities/global_dominios.entity';
import { ExpedienteAcademicoDetalle } from '../entities/expediente_academico_detalle.entity';

import { CreateExpedienteAcademicoDto } from '../dtos/create-expediente_academico.dto';
import { UpdateExpedienteAcademicoDto } from '../dtos/update-expediente_academico.dto';

import * as FormData from 'form-data';
import axios from 'axios';


@Injectable()
export class ExpedienteService {

  private readonly logger = new Logger(ExpedienteService.name);

  private readonly remoteServerUrl = process.env.REMOTE_SERVER_URL;

  
  constructor(
    @InjectRepository(ExpedienteAcademico)
    private readonly expedienteRepository: Repository<ExpedienteAcademico>,
    @InjectRepository(GlobalDominios)
    private readonly globalDominiosRepository: Repository<GlobalDominios>,
    @InjectRepository(ExpedienteAcademicoDetalle)
    private readonly expedienteDetalleRepository: Repository<ExpedienteAcademicoDetalle>,
  ) {}

  async findAll() {
    return this.expedienteRepository.query(`
      SELECT 
        ea."EXPA_ID",
        ca."CAR_NOMBRE",
        ea."EXPA_IDENTIFICACION",
        et."EXPTT_NOMBRE",
        gp."PER_PERIODO",
        ea."EXPA_OBSERVACION",
        ea."EXPA_ESTADO"
      FROM 
        "tbl_expediente_academico" ea
      JOIN 
        "tbl_expediente_tipo_tramite" et ON ea."EXPTT_ID" = et."ESPTT_ID"
      JOIN 
        "tbl_global_periodos" gp ON ea."PER_ID" = gp."PER_ID"
      JOIN 
        "tbl_carrera" ca ON ea."CAR_ID" = ca."CAR_ID"
      WHERE 
        ea."EXPA_ESTADO" = 1
    `);
  }

  async findByIdentificacionAndPeriod(identificacion: string, idPeriodo: number) {
    return this.expedienteRepository.query(`
      SELECT 
        ea."EXPA_ID",
        ca."CAR_NOMBRE" AS "CARRERA",
        ea."EXPA_IDENTIFICACION" AS "CÉDULA",
        ea."EXPTT_ID",
        et."EXPTT_NOMBRE" AS "TRÁMITES",
        gp."PER_PERIODO" AS "PERIODO",
        ea."EXPA_OBSERVACION" AS "OBSERVACIÓN"
      FROM 
        "tbl_expediente_academico" ea
      JOIN 
        "tbl_expediente_tipo_tramite" et ON ea."EXPTT_ID" = et."ESPTT_ID"
      JOIN 
        "tbl_global_periodos" gp ON ea."PER_ID" = gp."PER_ID"
      JOIN 
        "tbl_carrera" ca ON ea."CAR_ID" = ca."CAR_ID"
      WHERE 
        ea."EXPA_IDENTIFICACION" = $1
        AND ea."PER_ID" = $2
        AND ea."EXPA_ESTADO" = 1
    `, [identificacion, idPeriodo]);
  }

  async findByCedula(cedula: string): Promise<any[]> {
    this.logger.log(`Buscando expediente con cédula: ${cedula}`);  // Registra el valor de cédula

    const result = await this.expedienteRepository.query(`
      SELECT DISTINCT gp."PER_PERIODO" AS "PERIODO", gp."PER_ID"
        FROM 
        "tbl_expediente_academico" ea
        JOIN 
        "tbl_global_periodos" gp ON ea."PER_ID" = gp."PER_ID"
        WHERE 
        ea."EXPA_IDENTIFICACION" = $1
    `, [cedula]);

    this.logger.log(`Resultado de la consulta: ${JSON.stringify(result)}`);  // Registra los resultados

    return result;
  }



    async findByUserAndPeriod(idUsuario: number, idPeriodo: number) {
    return this.expedienteRepository.query(`
        SELECT 
        ea."EXPA_ID",
        ca."CAR_NOMBRE" AS "CARRERA",
        ea."EXPA_IDENTIFICACION" AS "CÉDULA",
        ge."APELLIDOS",
        ge."NOMBRES",
        ea."EXPTT_ID",
        et."EXPTT_NOMBRE" AS "TIPO",
        gp."PER_PERIODO" AS "PERIODO",
        ea."EXPA_OBSERVACION" AS "OBSERVACIÓN"
        FROM 
        "tbl_expediente_academico" ea
        JOIN 
        "tbl_global_periodos" gp ON ea."PER_ID" = gp."PER_ID"
        JOIN 
        "tbl_expediente_tipo_tramite" et ON ea."EXPTT_ID" = et."ESPTT_ID"
        JOIN 
        "tbl_carrera" ca ON ea."CAR_ID" = ca."CAR_ID"
        JOIN 
        "tbl_global_estudiantes_distinct" ge ON ea."EXPA_IDENTIFICACION" = ge."IDENTIFICACION"
        WHERE 
        ea."CAR_ID" IN (
            SELECT "CAR_ID"
            FROM "tbl_usuario_carrera_privilegios"
            WHERE "USU_ID" = $1
        )
        AND ea."PER_ID" = $2
        AND ea."EXPA_ESTADO" = 1  
    `, [idUsuario, idPeriodo]);
    }


  async findExpedienteDetalleById(idExpediente: number) {
    const detalles = await this.expedienteRepository.query(`
      SELECT "EXPAD_ID", "EXPA_ID", "EXPAD_DOCUMENTO", "EXPAD_DETALLE"
      FROM public.tbl_expediente_academico_detalle
      WHERE "EXPA_ID" = $1
    `, [idExpediente]);

    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    return {
      detalles,
      dominio: dominio?.GDOM_DOMINIO,
      descripcion: dominio?.GDOM_DESCRIPCION,
    };
  }



  async deleteExpedienteDetalle(EXPAD_ID: number): Promise<any> {
    const result = await this.expedienteDetalleRepository.query(`
      DELETE FROM public.tbl_expediente_academico_detalle
      WHERE "EXPAD_ID" = $1
      RETURNING *;
    `, [EXPAD_ID]);

    if (result.length === 0) {
      throw new HttpException('Detalle no encontrado', HttpStatus.NOT_FOUND);
    }
    return { message: 'Detalle eliminado exitosamente', detalle: result[0] };
  }


  async create(createExpedienteDto: CreateExpedienteAcademicoDto) {
    return this.expedienteRepository.save(createExpedienteDto);
  }

  async update(id: number, updateExpedienteDto: UpdateExpedienteAcademicoDto) {
    return this.expedienteRepository.update({ EXPA_ID: id }, updateExpedienteDto);
  }

  async findTramiteTypes() {
    return this.expedienteRepository.query(`
      SELECT 
	"ESPTT_ID" AS "EXPTT_ID", 
	"EXPTT_NOMBRE" AS "NOMBRE", 
	"EXPTT_OBSERVACION" AS "OBSERVACIÓN"
      FROM public."tbl_expediente_tipo_tramite"
      WHERE 
        "EXPTT_ESTADO" = 1
      ORDER BY "EXPTT_NOMBRE" ASC

    `);
  }


  async createExpedienteDetalle(EXPA_ID: number, EXPAD_DETALLE: string, generatedFileName: string, file: Express.Multer.File) {  
    try {  
      // Log de entrada  
      console.log('Iniciando createExpedienteDetalle', {  
        EXPA_ID,  
        fileOriginalName: file?.originalname,  
        fileSize: file?.size,  
        fileMimeType: file?.mimetype  
      });  

      if (!file) {  
        throw new Error('File not provided.');  
      }  

      // Reutiliza la lógica de Vinculación para generar el nombre del archivo  
      const newFileName = this.generateFileName(file.originalname);  
      const remoteUploadUrl = `${this.remoteServerUrl}/index.php/expediente`;  

      // Sube el archivo al servidor remoto (mismo proceso que Vinculación)  
      await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);  

      // Ruta donde se guarda el archivo  
      const fileLink = `/public/expediente/detalle/${newFileName}`;  

      // Guarda los detalles del expediente en la base de datos  
      const result = await this.expedienteDetalleRepository.save({  
        EXPA_ID,  
        EXPAD_DETALLE,  
        EXPAD_DOCUMENTO: fileLink,  
      });  

      // Log de éxito  
      console.log('Expediente detalle creado exitosamente', {  
        fileLink,  
        EXPA_ID  
      });  

      return result;  
    } catch (error) {  
      // Log de error detallado  
      console.error('Error en createExpedienteDetalle', {  
        message: error.message,  
        stack: error.stack,  
        fileName: file?.originalname  
      });  

      // Relanza el error para que el controlador lo maneje  
      throw error;  
    }  
  }  
  // Método para agregar varios expedientes históricos
  async addExpedientesHistoricos(EXPA_ID: number, files: Express.Multer.File[]): Promise<void> {
    for (const file of files) {
      const newFileName = this.generateFileName(file.originalname);
      const remoteUploadUrl = `${this.remoteServerUrl}/index.php/expediente_historico`;

      // Subir archivo al servidor remoto
      await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);

      // Generar el enlace del archivo guardado
      const fileLink = `/public/expediente/historico/${newFileName}`;

      // Guardar el detalle del expediente en la base de datos
      await this.expedienteDetalleRepository.save({
        EXPA_ID,
        EXPAD_DOCUMENTO: fileLink,
        EXPAD_DETALLE: file.originalname, // Guardar el nombre original del archivo
      });
    }
  }

  private generateFileName(originalName: string): string {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const randomString = Math.random().toString(36).substring(7);
    const ext = originalName.split('.').pop(); // Extrae la extensión del archivo original
    return `${timestamp}-${randomString}.${ext}`; // Incluye la extensión en el nuevo nombre
  }

  private async uploadFileToRemoteServer(file: Express.Multer.File, remoteUploadUrl: string, fileName: string): Promise<void> {
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: fileName, contentType: file.mimetype });

    try {
      await axios.post(remoteUploadUrl, formData, {
        headers: formData.getHeaders(),
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: false, // Permitir certificados no verificados (opcional)
        }),
      });
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }


  async getEstudiantesPorCarrera(perID: number) {  
    return this.expedienteRepository.query(`  
      SELECT   
        ea."CAR_ID",   
        c."CAR_NOMBRE" AS "CARRERA",  
        COUNT(*) AS "ESTUDIANTES"  
      FROM   
        public.tbl_expediente_academico ea  
      JOIN   
        public.tbl_carrera c ON ea."CAR_ID" = c."CAR_ID"  
      WHERE   
        ea."PER_ID" = $1  
      GROUP BY   
        ea."CAR_ID",   
        c."CAR_NOMBRE"  
      ORDER BY   
        c."CAR_NOMBRE" ASC  
    `, [perID]);  
  } 


  async seguimientoPeriodoEstudiantes() {  
    return this.expedienteRepository.query(`
      SELECT   
        CONCAT(  
          CASE   
            WHEN "PER_PERIODO" = '1' THEN '1er'  
            WHEN "PER_PERIODO" = '2' THEN '2do'  
            ELSE "PER_PERIODO"  
          END,   
          ' Período Ordinario ',   
          "PER_ANO",   
          ' TEC - ',   
          "PER_BANNER"  
        ) AS "PERIODOS",  
        COUNT(*) AS "# REGISTROS"  
      FROM   
        public.tbl_expediente_academico ea  
      JOIN   
        public.tbl_global_periodos gp ON ea."PER_ID" = gp."PER_ID"  
      GROUP BY   
        CONCAT(  
          CASE   
            WHEN "PER_PERIODO" = '1' THEN '1er'  
            WHEN "PER_PERIODO" = '2' THEN '2do'  
            ELSE "PER_PERIODO"  
          END,   
          ' Período Ordinario ',   
          "PER_ANO",   
          ' TEC - ',   
          "PER_BANNER"  
        ),   
        "PER_ANO"  
      ORDER BY   
        "PER_ANO" DESC,  
        "PERIODOS"
    `);  
  }



}
