import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VinculacionConveniosCartas } from '../entities/vinculacion_convenios_cartas.entity';
import { VinculacionEmpresas } from '../entities/vinculacion_empresas.entity';
import { CreateVinculacionConvenioDto } from '../dtos/create-vinculacion-convenio.dto';

import { GlobalDominios } from '../../biblioteca/entities/global_dominios.entity'; 


import { VinculacionPractica } from '../entities/vinculacion_practica.entity';
import { CreateVinculacionPracticaDto } from '../dtos/create-vinculacion-practica.dto';

import { VinculacionPracticaEstudiante } from '../entities/vinculacion_practica_estudiante.entity';
import { VinculacionPracticaEstudianteEstados } from '../entities/vinculacion_practica_estudiante_estados.entity';
import { CreateVinculacionPracticaEstudianteDto } from '../dtos/create-vinculacion-practica-estudiante.dto';

import { CreateAsistenciaEstudianteDto } from '../dtos/create-asistencia-estudiante.dto';


import { VinculacionCodigoProgramaBanner } from '../entities/vinculacion-codigo-programa-banner.entity';  

import { PracticaSeguimiento } from '../entities/practica-seguimiento.entity'; 
import { CreateSeguimientoDto } from '../dtos/create-practica-seguimiento.dto'; 

import { UpdatePracticasPlanDto } from '../dtos/update_practicas_plan.dto';  
import { UpdatePracticasResultadosDto } from '../dtos/update_practicas_resultados.dto';



import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class VinculacionService {
  private readonly remoteServerUrl = process.env.REMOTE_SERVER_URL;

  constructor(
    @InjectRepository(VinculacionConveniosCartas)
    private vinculacionConveniosCartasRepository: Repository<VinculacionConveniosCartas>,
    @InjectRepository(VinculacionEmpresas)
    private vinculacionEmpresasRepository: Repository<VinculacionEmpresas>,
    @InjectRepository(VinculacionPractica)
    private vinculacionPracticaRepository: Repository<VinculacionPractica>,
    @InjectRepository(GlobalDominios)  
    private globalDominiosRepository: Repository<GlobalDominios>,
    @InjectRepository(VinculacionPracticaEstudiante)
    private vinculacionPracticaEstudianteRepository: Repository<VinculacionPracticaEstudiante>,
    @InjectRepository(VinculacionPracticaEstudianteEstados)
    private vinculacionPracticaEstudianteEstadosRepository: Repository<VinculacionPracticaEstudianteEstados>,
    @InjectRepository(VinculacionCodigoProgramaBanner)  
    private readonly vinculacionRepository: Repository<VinculacionCodigoProgramaBanner>,   
    @InjectRepository(PracticaSeguimiento)  
    private readonly vinculacionPracticaSeguimientoRepository: Repository<PracticaSeguimiento>  
  ) {}


  async getMatrizIntegral(): Promise<any> {
    // Consulta de la matriz integral de prácticas
    const detalles = await this.vinculacionConveniosCartasRepository.query(`
        SELECT   
            a."EST_CEDULA" AS "NÚMERO DE DOCUMENTO DEL PARTICIPANTE",   
            b."APELLIDOS" AS "APELLIDOS DEL PARTICIPANTE",   
            b."NOMBRES" AS "NOMBRES DEL PARTICIPANTE",   
            d."VINPT_NOMBRE" AS "TIPO DE PRÁCTICA",   
            e."VINESP_NOMBRE" AS "ESPECIFICAR PRACTICA",  
            f."VINE_NOMBRE" AS "NOMBRE DE ENTIDAD RECEPTORA",   
            g."VINET_NOMBRE" AS "TIPO DE INSTITUCIÓN",   
            CASE   
                WHEN f."VINE_SECTOR_ECONOMICO" = 1 THEN 'Primario'  
                WHEN f."VINE_SECTOR_ECONOMICO" = 2 THEN 'Secundario'  
                WHEN f."VINE_SECTOR_ECONOMICO" = 3 THEN 'Terciario'  
                ELSE 'Desconocido'  
            END AS "SECTOR ECONÓMICO DE LA INSTITUCIÓN",  
            c."VINP_FECHA_INICIO" AS "FECHA DE INICIO",   
            c."VINP_FECHA_FIN" AS "FECHA DE FINALIZACIÓN",  
            c."VINP_HORAS_PRACTICAS" AS "HORAS DE PRÁCTICAS LABORALES DEL PARTICIPANTE",   
            cs."VCCE_CODIGO" AS "CAMPO ESPECÍFICO CÓDIGO",   
            cs."VCCE_DESCRIPCION" AS "CAMPO ESPECÍFICO DES.",  
            cd."VCCD_CODIGO" AS "CAMPO DETALLADO CÓDIGO",   
            cd."VCCD_DESCRIPCION" AS "CAMPO DETALLADO DES.",  
            c."DOC_CEDULA" AS "IDENTIFICACIÓN DEL DOCENTE TUTOR",   
            h."LDOC_NOMBRE" AS "NOMBRE DEL DOCENTE",   
            a."VINPE_CETIFICADO" AS "EVIDENCIA (CERTICADO DE PRACTICAS LABORALES)",  
            i."SEDE_NOMBRE" AS "SEDE",  
            j."VINCC_LINK" AS "EVIDENCIA DEL CONVENIO ",  
            k."CAR_NOMBRE" AS "CARRERA"  
        FROM   
            public.tbl_vinculacion_practica_estudiante a  
        LEFT JOIN   
            public.tbl_global_estudiantes_distinct b ON a."EST_CEDULA" = b."IDENTIFICACION"  
        LEFT JOIN   
            public.tbl_vinculacion_practica c ON a."VINP_ID" = c."VINP_ID"  
        LEFT JOIN   
            public.tbl_vinculacion_practica_tipo d ON c."VINPT_ID" = d."VINPT_ID"  
        LEFT JOIN   
            public.tbl_vinculacion_especificacion e ON c."VINESP_ID" = e."VINESP_ID"  
        LEFT JOIN   
            public.tbl_vinculacion_empresas f ON c."VINE_ID" = f."VINE_ID"  
        LEFT JOIN   
            public.tbl_vinculacion_empresa_tipo g ON f."VINET_ID" = g."VINET_ID"  
        LEFT JOIN   
            public.tbl_global_personal h ON c."DOC_CEDULA" = h."LDOC_CEDULA"  
        LEFT JOIN   
            public.tbl_global_sede i ON c."SEDE_ID" = i."SEDE_ID"  
        LEFT JOIN   
            public.tbl_vinculacion_convenios_cartas j ON f."VINE_ID" = j."VINE_ID"  
        LEFT JOIN   
            public.tbl_vinculacion_cine_campo_especifico cs ON c."VINP_CAMPO_ESP" = cs."VCCE_ID"  
        LEFT JOIN   
            public.tbl_vinculacion_cine_campo_detallado cd ON c."VINP_CAMPO_DET" = cd."VCCD_ID"  
        LEFT JOIN   
            public.tbl_carrera k ON c."CAR_ID" = k."CAR_ID";
    `);

    // Consultar el dominio
    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    return {
      detalles,
      dominio: dominio?.GDOM_DOMINIO,
      descripcion: dominio?.GDOM_DESCRIPCION,
    };
  }



    
  async findActiveConvenios(): Promise<any> {
    const detalles = await this.vinculacionConveniosCartasRepository.query(`
      SELECT vcc."VINCC_ID", ve."VINE_NOMBRE", vcc."VINCC_LINK"
      FROM public."tbl_vinculacion_convenios_cartas" vcc
      JOIN public."tbl_vinculacion_empresas" ve ON vcc."VINE_ID" = ve."VINE_ID"
      WHERE vcc."VINCC_ESTADO" = 1 ORDER BY vcc."VINCC_ID" DESC
    `);

    // Consultar el dominio
    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    return {
      detalles,
      dominio: dominio?.GDOM_DOMINIO,
      descripcion: dominio?.GDOM_DESCRIPCION,
    };


  }

  async createConvenio(createDto: CreateVinculacionConvenioDto, file: Express.Multer.File) {
        const VINE_ID = Number(createDto.VINE_ID);
        
        // Asigna el valor predeterminado para VINCC_ESTADO (por ejemplo, 1)
        const VINCC_ESTADO = 1;
    
        if (isNaN(VINE_ID)) {
        throw new Error('Invalid VINE_ID. It must be a number.');
        }
    
        if (!file) {
        throw new Error('File not provided.');
        }
    
        const newFileName = this.generateFileName(file.originalname);
        const remoteUploadUrl = `${this.remoteServerUrl}/index.php/convenios`;
    
        // Subir el archivo al servidor remoto
        await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);
    
        const fileLink = `/public/vinculacion/convenios/${newFileName}`;
    
        return this.vinculacionConveniosCartasRepository.query(
        `INSERT INTO public.tbl_vinculacion_convenios_cartas ("VINE_ID", "VINCC_LINK", "VINCC_ESTADO")
        VALUES ($1, $2, $3)`,
        [VINE_ID, fileLink, VINCC_ESTADO],  // Usa VINCC_ESTADO asignado aquí
        );
  }
  


  async updateConvenio(id: number, updateDto: CreateVinculacionConvenioDto, file?: Express.Multer.File): Promise<any> {
    const VINCC_ID = Number(id);

    if (isNaN(VINCC_ID)) {
      throw new HttpException('Invalid VINCC_ID. It must be a number.', HttpStatus.BAD_REQUEST);
    }

    let fileLink = null;

    if (file) {
      const newFileName = this.generateFileName(file.originalname);
      const remoteUploadUrl = `${this.remoteServerUrl}/index.php/convenios`;

      await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);
      fileLink = `/public/vinculacion/convenios/${newFileName}`;
    }

    // Construir dinámicamente la consulta SQL
    const updates = [];
    const values = [];

    if (updateDto.VINE_ID !== undefined) {
      updates.push(`"VINE_ID" = $${updates.length + 1}`);
      values.push(updateDto.VINE_ID);
    }

    if (updateDto.VINCC_LINK !== undefined || fileLink !== null) {
      updates.push(`"VINCC_LINK" = $${updates.length + 1}`);
      values.push(fileLink ?? updateDto.VINCC_LINK);
    }

    if (updateDto.VINCC_ESTADO !== undefined) {
      updates.push(`"VINCC_ESTADO" = $${updates.length + 1}`);
      values.push(updateDto.VINCC_ESTADO);
    }

    if (updates.length === 0) {
      throw new HttpException('No fields to update', HttpStatus.BAD_REQUEST);
    }

    values.push(VINCC_ID);

    const query = `
      UPDATE public.tbl_vinculacion_convenios_cartas
      SET ${updates.join(', ')}
      WHERE "VINCC_ID" = $${values.length}
    `;

    return this.vinculacionConveniosCartasRepository.query(query, values);
  }


  
  private generateFileName(originalName: string): string {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const randomString = Math.random().toString(36).substring(7);
        const extension = originalName.split('.').pop(); // Obtener la extensión del archivo
        return `${timestamp}-${randomString}.${extension}`; // Agregar la extensión al nuevo nombre
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



  async getPracticaPorUsuario(USU_ID: number): Promise<any> {
    // Buscar los CAR_ID asignados al usuario
    const carreras = await this.vinculacionPracticaRepository.query(`
      SELECT "CAR_ID"
      FROM public.tbl_usuario_carrera_privilegios
      WHERE "USU_ID" = $1 AND "USUCP_VINCULACION" = 1
    `, [USU_ID]);

    if (!carreras.length) {
      throw new HttpException('No se encontraron carreras asignadas al usuario', HttpStatus.NOT_FOUND);
    }

    const carIds = carreras.map((carrera) => carrera.CAR_ID);

    // Buscar las prácticas asociadas a las carreras
    const detalles = await this.vinculacionPracticaRepository.query(`
      SELECT 
        vp."VINP_ID",
        vpt."VINPT_NOMBRE" AS "Tipo de práctica",
        ve."VINESP_NOMBRE" AS "Especificación de práctica",
        vemp."VINE_NOMBRE" AS "Entidad receptora",
        vp."VINP_FECHA_INICIO" AS "Fecha de inicio",
        vp."VINP_FECHA_FIN" AS "Fecha de finalización",
        vp."VINP_HORAS_PRACTICAS" AS "Horas prácticas",
        vce."VCCE_CODIGO" AS "Campo específico código",
        vce."VCCE_DESCRIPCION" AS "Campo específico descripción",
        vcd."VCCD_CODIGO" AS "Campo detallado código",
        vcd."VCCD_DESCRIPCION" AS "Campo detallado descripción",
        gp."PER_PERIODO" AS "Periodo",
        c."CAR_NOMBRE" AS "Carrera",
        s."SEDE_NOMBRE" AS "Sede",
        COALESCE(vca."VCCA_CODIGO", '') || ' - ' || COALESCE(vca."VCCA_DESCRIPCION", '') AS "Campo amplio",
	vp."VINP_PLAN" AS "Plan",
        vp."VINP_RESULTADOS" AS "Resultado"
      FROM 
        public.tbl_vinculacion_practica vp
      LEFT JOIN 
        public.tbl_vinculacion_practica_tipo vpt ON vp."VINPT_ID" = vpt."VINPT_ID"
      LEFT JOIN 
        public.tbl_vinculacion_especificacion ve ON vp."VINESP_ID" = ve."VINESP_ID"
      LEFT JOIN 
        public.tbl_vinculacion_empresas vemp ON vp."VINE_ID" = vemp."VINE_ID"
      LEFT JOIN 
        public.tbl_vinculacion_cine_campo_especifico vce ON vp."VINP_CAMPO_ESP" = vce."VCCE_ID"
      LEFT JOIN 
        public.tbl_vinculacion_cine_campo_detallado vcd ON vp."VINP_CAMPO_DET" = vcd."VCCD_ID"
      LEFT JOIN 
        public.tbl_global_periodos gp ON vp."PER_ID" = gp."PER_ID"
      LEFT JOIN 
        public.tbl_carrera c ON vp."CAR_ID" = c."CAR_ID"
      LEFT JOIN 
        public.tbl_global_sede s ON vp."SEDE_ID" = s."SEDE_ID"
      LEFT JOIN 
        public.tbl_vinculacion_cine_campo_amplio vca ON vp."VINP_CAMPO_AMP" = vca."VCCA_ID"
      WHERE 
        vp."CAR_ID" = ANY($1) AND vp."VINP_ESTADO" = 1
    `, [carIds]);


    // Consultar el dominio
    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    return {
      detalles,
      dominio: dominio?.GDOM_DOMINIO,
      descripcion: dominio?.GDOM_DESCRIPCION,
    };



  }




  async findPracticasPorCarrera(idCarrera: string): Promise<any[]> {
    return this.vinculacionPracticaRepository.query(`
        SELECT 
            vp."VINP_ID",
            vpt."VINPT_NOMBRE" AS "Tipo de práctica",
            ve."VINESP_NOMBRE" AS "Especificación de práctica",
            ve2."VINE_NOMBRE" AS "Empresa",
            COALESCE(vca."VCCA_CODIGO", '') || ' ' || COALESCE(vca."VCCA_DESCRIPCION", '') AS "Campo amplio",
            COALESCE(vce."VCCE_CODIGO", '') || ' ' || COALESCE(vce."VCCE_DESCRIPCION", '') AS "Campo específico",
            COALESCE(vcd."VCCD_CODIGO", '') || ' ' || COALESCE(vcd."VCCD_DESCRIPCION", '') AS "Campo detallado",
            gp."PER_PERIODO" AS "Periodo",
            COALESCE(c."CAR_CODIGO", '') || ' ' || COALESCE(c."CAR_NOMBRE", '') AS "Carrera",
            s."SEDE_NOMBRE" AS "Sede",
            vp."VINP_FECHA_INICIO",
            vp."VINP_FECHA_FIN",
            vp."VINP_HORAS_PRACTICAS",
            COALESCE(p."LDOC_NOMBRE", '') || ' ' || COALESCE(p."LDOC_CEDULA", '') AS "Docente",
            vp."VINP_ESTADO"
        FROM 
            public.tbl_vinculacion_practica vp
        LEFT JOIN 
            public.tbl_vinculacion_practica_tipo vpt ON vp."VINPT_ID" = vpt."VINPT_ID"
        LEFT JOIN 
            public.tbl_vinculacion_especificacion ve ON vp."VINESP_ID" = ve."VINESP_ID"
        LEFT JOIN 
            public.tbl_vinculacion_empresas ve2 ON vp."VINE_ID" = ve2."VINE_ID"
        LEFT JOIN 
            public.tbl_vinculacion_cine_campo_amplio vca ON vp."VINP_CAMPO_AMP" = vca."VCCA_ID"
        LEFT JOIN 
            public.tbl_vinculacion_cine_campo_especifico vce ON vp."VINP_CAMPO_ESP" = vce."VCCE_ID"
        LEFT JOIN 
            public.tbl_vinculacion_cine_campo_detallado vcd ON vp."VINP_CAMPO_DET" = vcd."VCCD_ID"
        LEFT JOIN 
            public.tbl_global_periodos gp ON vp."PER_ID" = gp."PER_ID"
        LEFT JOIN 
            public.tbl_carrera c ON vp."CAR_ID" = c."CAR_ID"
        LEFT JOIN 
            public.tbl_global_sede s ON vp."SEDE_ID" = s."SEDE_ID"
        LEFT JOIN 
            public.tbl_global_personal p ON vp."DOC_CEDULA" = p."LDOC_CEDULA"

       WHERE vp."CAR_ID" = $1 AND vp."VINP_ESTADO" = 1
    `, [idCarrera]);
  }

  async findPracticasPorPeriodo(idPeriodo: string): Promise<any[]> {
    return this.vinculacionPracticaRepository.query(`
        SELECT 
            vp."VINP_ID",
            vpt."VINPT_NOMBRE" AS "Tipo de práctica",
            ve."VINESP_NOMBRE" AS "Especificación de práctica",
            ve2."VINE_NOMBRE" AS "Empresa",
            COALESCE(vca."VCCA_CODIGO", '') || ' ' || COALESCE(vca."VCCA_DESCRIPCION", '') AS "Campo amplio",
            COALESCE(vce."VCCE_CODIGO", '') || ' ' || COALESCE(vce."VCCE_DESCRIPCION", '') AS "Campo específico",
            COALESCE(vcd."VCCD_CODIGO", '') || ' ' || COALESCE(vcd."VCCD_DESCRIPCION", '') AS "Campo detallado",
            gp."PER_PERIODO" AS "Periodo",
            COALESCE(c."CAR_CODIGO", '') || ' ' || COALESCE(c."CAR_NOMBRE", '') AS "Carrera",
            s."SEDE_NOMBRE" AS "Sede",
            vp."VINP_FECHA_INICIO",
            vp."VINP_FECHA_FIN",
            vp."VINP_HORAS_PRACTICAS",
            COALESCE(p."LDOC_NOMBRE", '') || ' ' || COALESCE(p."LDOC_CEDULA", '') AS "Docente",
            vp."VINP_ESTADO"
        FROM 
            public.tbl_vinculacion_practica vp
        LEFT JOIN 
            public.tbl_vinculacion_practica_tipo vpt ON vp."VINPT_ID" = vpt."VINPT_ID"
        LEFT JOIN 
            public.tbl_vinculacion_especificacion ve ON vp."VINESP_ID" = ve."VINESP_ID"
        LEFT JOIN 
            public.tbl_vinculacion_empresas ve2 ON vp."VINE_ID" = ve2."VINE_ID"
        LEFT JOIN 
            public.tbl_vinculacion_cine_campo_amplio vca ON vp."VINP_CAMPO_AMP" = vca."VCCA_ID"
        LEFT JOIN 
            public.tbl_vinculacion_cine_campo_especifico vce ON vp."VINP_CAMPO_ESP" = vce."VCCE_ID"
        LEFT JOIN 
            public.tbl_vinculacion_cine_campo_detallado vcd ON vp."VINP_CAMPO_DET" = vcd."VCCD_ID"
        LEFT JOIN 
            public.tbl_global_periodos gp ON vp."PER_ID" = gp."PER_ID"
        LEFT JOIN 
            public.tbl_carrera c ON vp."CAR_ID" = c."CAR_ID"
        LEFT JOIN 
            public.tbl_global_sede s ON vp."SEDE_ID" = s."SEDE_ID"
        LEFT JOIN 
            public.tbl_global_personal p ON vp."DOC_CEDULA" = p."LDOC_CEDULA"

        WHERE vp."PER_ID" = $1 AND vp."VINP_ESTADO" = 1
    `, [idPeriodo]);
  }

  async findPracticasPorPeriodoYCarrera(idPeriodo: string, idCarrera: string): Promise<any[]> {
    return this.vinculacionPracticaRepository.query(`
        SELECT 
            vp."VINP_ID",
            vpt."VINPT_NOMBRE" AS "Tipo de práctica",
            ve."VINESP_NOMBRE" AS "Especificación de práctica",
            ve2."VINE_NOMBRE" AS "Empresa",
            COALESCE(vca."VCCA_CODIGO", '') || ' ' || COALESCE(vca."VCCA_DESCRIPCION", '') AS "Campo amplio",
            COALESCE(vce."VCCE_CODIGO", '') || ' ' || COALESCE(vce."VCCE_DESCRIPCION", '') AS "Campo específico",
            COALESCE(vcd."VCCD_CODIGO", '') || ' ' || COALESCE(vcd."VCCD_DESCRIPCION", '') AS "Campo detallado",
            gp."PER_PERIODO" AS "Periodo",
            COALESCE(c."CAR_CODIGO", '') || ' ' || COALESCE(c."CAR_NOMBRE", '') AS "Carrera",
            s."SEDE_NOMBRE" AS "Sede",
            vp."VINP_FECHA_INICIO",
            vp."VINP_FECHA_FIN",
            vp."VINP_HORAS_PRACTICAS",
            COALESCE(p."LDOC_NOMBRE", '') || ' ' || COALESCE(p."LDOC_CEDULA", '') AS "Docente",
            vp."VINP_ESTADO"
        FROM 
            public.tbl_vinculacion_practica vp
        LEFT JOIN 
            public.tbl_vinculacion_practica_tipo vpt ON vp."VINPT_ID" = vpt."VINPT_ID"
        LEFT JOIN 
            public.tbl_vinculacion_especificacion ve ON vp."VINESP_ID" = ve."VINESP_ID"
        LEFT JOIN 
            public.tbl_vinculacion_empresas ve2 ON vp."VINE_ID" = ve2."VINE_ID"
        LEFT JOIN 
            public.tbl_vinculacion_cine_campo_amplio vca ON vp."VINP_CAMPO_AMP" = vca."VCCA_ID"
        LEFT JOIN 
            public.tbl_vinculacion_cine_campo_especifico vce ON vp."VINP_CAMPO_ESP" = vce."VCCE_ID"
        LEFT JOIN 
            public.tbl_vinculacion_cine_campo_detallado vcd ON vp."VINP_CAMPO_DET" = vcd."VCCD_ID"
        LEFT JOIN 
            public.tbl_global_periodos gp ON vp."PER_ID" = gp."PER_ID"
        LEFT JOIN 
            public.tbl_carrera c ON vp."CAR_ID" = c."CAR_ID"
        LEFT JOIN 
            public.tbl_global_sede s ON vp."SEDE_ID" = s."SEDE_ID"
        LEFT JOIN 
            public.tbl_global_personal p ON vp."DOC_CEDULA" = p."LDOC_CEDULA"

       WHERE vp."PER_ID" = $1 AND vp."CAR_ID" = $2 AND vp."VINP_ESTADO" = 1
    `, [idPeriodo, idCarrera]);
  }

  async createPractica(createPracticaDto: CreateVinculacionPracticaDto): Promise<void> {  
    await this.vinculacionPracticaRepository.query(`  
      INSERT INTO public.tbl_vinculacion_practica   
      ("VINPT_ID", "VINESP_ID", "VINE_ID", "VINP_FECHA_INICIO", "VINP_FECHA_FIN", "VINP_HORAS_PRACTICAS", "VINP_CAMPO_ESP", "VINP_CAMPO_DET", "DOC_CEDULA", "SEDE_ID", "VINP_ESTADO", "VINP_CAMPO_AMP", "PER_ID", "CAR_ID", "VCPB_CODIGO")  
      VALUES (\$1, \$2, \$3, \$4, \$5, \$6, \$7, \$8, \$9, \$10, \$11, \$12, \$13, \$14, \$15)  
    `, [  
      Number(createPracticaDto.VINPT_ID),  
      Number(createPracticaDto.VINESP_ID),  
      Number(createPracticaDto.VINE_ID),  
      new Date(createPracticaDto.VINP_FECHA_INICIO),  
      new Date(createPracticaDto.VINP_FECHA_FIN),  
      createPracticaDto.VINP_HORAS_PRACTICAS,  
      Number(createPracticaDto.VINP_CAMPO_ESP),  
      Number(createPracticaDto.VINP_CAMPO_DET),  
      createPracticaDto.DOC_CEDULA,  
      Number(createPracticaDto.SEDE_ID),  
      Number(createPracticaDto.VINP_ESTADO),  
      Number(createPracticaDto.VINP_CAMPO_AMP),  
      Number(createPracticaDto.PER_ID),  
      Number(createPracticaDto.CAR_ID),  
      createPracticaDto.VCPB_CODIGO // New Column  
    ]);  
  }

  // POST: Agregar a un estudiante a una práctica
  async agregarEstudianteAPractica(dto: CreateVinculacionPracticaEstudianteDto): Promise<void> {
    await this.vinculacionPracticaEstudianteRepository.query(`
      INSERT INTO public.tbl_vinculacion_practica_estudiante
      ("EST_CEDULA", "VINP_ID", "VINPE_ESTADO_PRACTICA")
      VALUES ($1, $2, 5)`,
      [dto.EST_CEDULA, Number(dto.VINP_ID)],
    );
  }

  // GET: Listado de estados de vinculación de estudiantes
  async listarEstadosVinculacion(): Promise<any[]> {
    return this.vinculacionPracticaEstudianteEstadosRepository.query(`
      SELECT "VINPEE_ID", "VINPEE_NOMBRE"
      FROM public.tbl_vinculacion_practica_estudiante_estados
    `);
  }

  // GET: Buscar prácticas por estudiante
  async buscarPracticasPorEstudiante(cedula: string): Promise<any[]> {
    return this.vinculacionPracticaEstudianteRepository.query(`
      SELECT vpe."VINPE_ID", vpe."EST_CEDULA", vpe."VINP_ID", vpe."VINPE_FECHA_REGISTRO",
      vpe."VINPE_ESTADO_PRACTICA", vpe."VINPE_OBSERVACION", vpe."VINPE_CETIFICADO",
      vpee."VINPEE_NOMBRE" AS "VINPE_ESTADO_PRACTICA"
      FROM public."tbl_vinculacion_practica_estudiante" vpe
      JOIN public."tbl_vinculacion_practica_estudiante_estados" vpee
      ON vpe."VINPE_ESTADO_PRACTICA" = vpee."VINPEE_ID"
      WHERE vpe."EST_CEDULA" = $1
    `, [cedula]);
  }

  async verEstudiantesPorPractica(VINP_ID: string): Promise<any[]> {
     return this.vinculacionPracticaEstudianteRepository.query(`
        SELECT 
            vpe."VINPE_ID", 
            vpe."EST_CEDULA" AS "Cédula", 
            vpe."VINP_ID", 
            vpe."VINPE_FECHA_REGISTRO" AS "Fecha de registro",
            vpe."VINPE_OBSERVACION" AS "Observación", 
            vpe."VINPE_CETIFICADO" AS "Certificado",
            vpee."VINPEE_NOMBRE" AS "Estado de la práctica",
            ge."SEXO" AS "Sexo", 
            ge."ETNIA" AS "Etnia", 
            ge."NACIONALIDAD" AS "Nacionalidad", 
            ge."APELLIDOS" AS "Apellidos", 
            ge."NOMBRES" AS "Nombres"
        FROM public."tbl_vinculacion_practica_estudiante" vpe
        JOIN public."tbl_vinculacion_practica_estudiante_estados" vpee
            ON vpe."VINPE_ESTADO_PRACTICA" = vpee."VINPEE_ID"
        LEFT JOIN (
            SELECT DISTINCT ON ("IDENTIFICACION") 
                "IDENTIFICACION", 
                "SEXO", 
                "ETNIA", 
                "NACIONALIDAD", 
                "APELLIDOS", 
                "NOMBRES"
            FROM public."tbl_global_estudiantes"
            ORDER BY "IDENTIFICACION"
        ) ge ON vpe."EST_CEDULA" = ge."IDENTIFICACION"
        WHERE vpe."VINP_ID" = $1
    `, [VINP_ID]);  
  }
  

  async actualizarEstadoPractica(VINPE_ID: number, VINPE_ESTADO_PRACTICA: number): Promise<void> {
    if (isNaN(VINPE_ID) || isNaN(VINPE_ESTADO_PRACTICA)) {
      throw new Error('Invalid VINPE_ID or VINPE_ESTADO_PRACTICA. They must be numbers.');
    }
    await this.vinculacionPracticaEstudianteRepository.query(`
      UPDATE public.tbl_vinculacion_practica_estudiante
      SET "VINPE_ESTADO_PRACTICA" = $1
      WHERE "VINPE_ID" = $2
    `, [VINPE_ESTADO_PRACTICA, VINPE_ID]);
  }


  async cargarArchivoPractica(VINPE_ID: number, file: Express.Multer.File): Promise<void> {
    if (!file) {
      throw new Error('File not provided.');
    }

    const newFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/practicas`;

    // Subir el archivo al servidor remoto
    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);

    const fileLink = `/public/vinculacion/practicas/${newFileName}`;

    await this.vinculacionPracticaEstudianteRepository.query(`
      UPDATE public.tbl_vinculacion_practica_estudiante
      SET "VINPE_CETIFICADO" = $1
      WHERE "VINPE_ID" = $2
    `, [fileLink, VINPE_ID]);
  }

  async escuelaCarreraPorCedula(cedula: string): Promise<any[]> {
    return this.vinculacionPracticaRepository.query(`
      WITH estudiante AS (
        SELECT "VINP_ID"
        FROM public.tbl_vinculacion_practica_estudiante
        WHERE "EST_CEDULA" = $1
      ),
      practica AS (
        SELECT "CAR_ID"
        FROM public.tbl_vinculacion_practica
        WHERE "VINP_ID" IN (SELECT "VINP_ID" FROM estudiante)
      )
      SELECT 
        c."CAR_ID", 
        c."CAR_NOMBRE", 
        c."CAR_PADREESC"
      FROM 
        public.tbl_carrera c
      WHERE 
        c."CAR_ID" IN (SELECT "CAR_ID" FROM practica);
    `, [cedula]);
  }


  async getVinculacionProgramaCodigoBanner(USU_ID: number): Promise<any> {  
    const query = `  
      WITH usuario_carreras AS (  
        SELECT DISTINCT "CAR_ID"  
        FROM public.tbl_usuario_carrera_privilegios  
        WHERE "USU_ID" = \$1 
      ),  
      programas AS (  
        SELECT   
            v."VCPB_CODIGO",   
            v."CAR_ID",   
            v."VCPB_NOMBRE",   
            t."CTIP_NOMBRE" AS "VCPB_TIPO",  
            ROW_NUMBER() OVER (PARTITION BY v."VCPB_CODIGO" ORDER BY v."CAR_ID") AS rn  
        FROM public.tbl_vinculacion_codigo_programa_banner v  
        INNER JOIN usuario_carreras u ON v."CAR_ID" = u."CAR_ID"  
        INNER JOIN public.tbl_carrera_tipo t ON CAST(v."VCPB_TIPO" AS INTEGER) = t."CTIP_ID"  
        WHERE v."VCPB_ESTADO" = 1   
      )  
      SELECT "VCPB_CODIGO", "CAR_ID", "VCPB_NOMBRE", "VCPB_TIPO"  
      FROM programas  
      WHERE rn = 1  
      ORDER BY "VCPB_NOMBRE" ASC;
    `;  

    // Execute the query and inject the parameter for USU_ID  
    const programas = await this.vinculacionRepository.query(query, [USU_ID]);  

    const formattedProgramas = programas.map((programa) => ({  
      'CÓDIGO BANNER': programa.VCPB_CODIGO,  
      CAR_ID: programa.CAR_ID,  
      CARRERA: programa.VCPB_NOMBRE,  
      TIPO: programa.VCPB_TIPO,  
    }));  

    return formattedProgramas;  
  }


  async createAsistenciaEstudiante(createAsistenciaEstudianteDto: CreateAsistenciaEstudianteDto): Promise<void> {  
    const fechaEntrada = createAsistenciaEstudianteDto.VINPR_FECHA_ENTRADA   
      ? new Date(createAsistenciaEstudianteDto.VINPR_FECHA_ENTRADA)   
      : null; // Manejar como nulo si no se envió  

    const fechaSalida = createAsistenciaEstudianteDto.VINPR_FECHA_SALIDA   
      ? new Date(createAsistenciaEstudianteDto.VINPR_FECHA_SALIDA)   
      : null; // Manejar como nulo si no se envió  

    const observacion = createAsistenciaEstudianteDto.VINPR_OBSERVACION || null; // Puede ser opcional  

    await this.vinculacionPracticaRepository.query(`  
      INSERT INTO public.tbl_vinculacion_practica_estudiante_registro   
      ("VINPR_FECHA_ENTRADA", "VINPR_FECHA_SALIDA", "VINPR_OBSERVACION", "VINPR_ESTADO", "USU_ID", "VINPE_ID")  
      VALUES (\$1, \$2, \$3, \$4, \$5, \$6)  
    `, [  
      fechaEntrada,  // Si es nulo, PostgreSQL lo manejará correctamente  
      fechaSalida,   // Igual que con entrada  
      observacion,   // Si no hay observación, introducimos nulo  
      1,             // Valor predeterminado de VINPR_ESTADO  
      createAsistenciaEstudianteDto.USU_ID,  
      createAsistenciaEstudianteDto.VINPE_ID,  
    ]);  
  }



  async obtenerRegistroAsistenciaPorEstudiante(VINPE_ID: number): Promise<any> {  
    const query = `  
      SELECT   
        vr."VINPR_FECHA_ENTRADA" AS "ENTRADA",  
        vr."VINPR_FECHA_SALIDA" AS "SALIDA",  
        vr."VINPR_OBSERVACION" AS "OBSERVACIÓN",  
        u."USU_NOMBRE" AS "REGISTRA"  
      FROM public.tbl_vinculacion_practica_estudiante_registro vr  
      JOIN public.tbl_vinculacion_practica_estudiante vpe  
        ON vr."VINPE_ID" = vpe."VINPE_ID"  
      JOIN public.tbl_usuarios u  
        ON vr."USU_ID" = u."USU_ID"  
      WHERE vpe."VINPE_ID" = \$1;  
    `;  

    try {  
      const result = await this.vinculacionConveniosCartasRepository.query(query, [VINPE_ID]);  
      if (!result.length) {  
        throw new HttpException('No records found', HttpStatus.NOT_FOUND);  
      }  
      return result;  
    } catch (error) {  
      throw new HttpException(  
        { message: 'Error fetching data', error: error.message },  
        HttpStatus.INTERNAL_SERVER_ERROR,  
      );  
    }  
  }



  async registrarPracticaSeguimiento(createSeguimientoDto: CreateSeguimientoDto, file: Express.Multer.File): Promise<void> {  
    const { VINPE_ID, VINPES_FECHA_REGISTRO, VINPES_OBSERVACION } = createSeguimientoDto;  

    // Validaciones  
    if (!file) {  
      throw new Error('File not provided.');  
    }  
    if (isNaN(VINPE_ID)) {  
      throw new Error('Invalid VINPE_ID. It must be a number.');  
    }  

    // Generar un nuevo nombre para el archivo  
    const newFileName = this.generateFileName(file.originalname);  

    // Construir URL para subida remota (incluyendo "index.php" y cualquier subruta necesaria)  
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/practica-seguimientos`; // Verifica si necesitas incluir "documental_dev"  

    console.log('Uploading file to remote URL:', remoteUploadUrl);  
    console.log('Generated file name:', newFileName);  

    // Subir el archivo al servidor remoto  
    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);  

    // Generar la ruta del archivo local  
    const filePath = `/public/vinculacion/practica-seguimientos/${newFileName}`;  

    // Insertar registro en la base de datos  
    const query = `  
      INSERT INTO public.tbl_vinculacion_practica_estudiante_seguimiento  
      ("VINPE_ID", "VINPES_FECHA_REGISTRO", "VINPES_OBSERVACION", "VINPES_RESPALDO", "VINPES_ESTADO")  
      VALUES (\$1, \$2, \$3, \$4, \$5);  
    `;  

    try {  
      await this.vinculacionPracticaSeguimientoRepository.query(query, [  
        VINPE_ID,  
        VINPES_FECHA_REGISTRO,  
        VINPES_OBSERVACION || null,  
        filePath,  
        1, // Estado predeterminado  
      ]);  
    } catch (error) {  
      console.error('Database query failed:', error);  
      throw new Error('Failed to insert seguimiento into the database.');  
    }  
  }


  async updatePracticaPlan(dto: UpdatePracticasPlanDto, file: Express.Multer.File): Promise<void> {  
    const { VINP_ID } = dto;  

    if (isNaN(VINP_ID)) {  
      throw new Error('Invalid VINP_ID. Must be a number.');  
    }  

    if (!file) {  
      throw new Error('File not provided.');  
    }  

    const newFileName = this.generateFileName(file.originalname);  
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/practicas-plan`;  

    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);  

    const filePath = `/public/vinculacion/practicas-plan/${newFileName}`;  

    const query = `  
      UPDATE public.tbl_vinculacion_practica  
      SET "VINP_PLAN" = \$1  
      WHERE "VINP_ID" = \$2  
    `;  

    try {  
      await this.vinculacionPracticaRepository.query(query, [filePath, VINP_ID]);  
    } catch (error) {  
      console.error('Database update failed:', error);  
      throw new Error('Failed to update VINP_PLAN.');  
    }  
  }

  async updatePracticaResultados(dto: UpdatePracticasResultadosDto, file: Express.Multer.File): Promise<void> {  
    const { VINP_ID } = dto;  

    if (isNaN(VINP_ID)) {  
      throw new Error('Invalid VINP_ID. Must be a number.');  
    }  

    if (!file) {  
      throw new Error('File not provided.');  
    }  

    const newFileName = this.generateFileName(file.originalname);  
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/practicas-resultados`;  

    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);  

    const filePath = `/public/vinculacion/practicas-resultados/${newFileName}`;  

    const query = `  
      UPDATE public.tbl_vinculacion_practica  
      SET "VINP_RESULTADOS" = \$1  
      WHERE "VINP_ID" = \$2  
    `;  

    try {  
      await this.vinculacionPracticaRepository.query(query, [filePath, VINP_ID]);  
    } catch (error) {  
      console.error('Database update failed:', error);  
      throw new Error('Failed to update VINP_RESULTADOS.');  
    }  
  }

  async getPracticasPorEmpresa(vineId: number): Promise<any> {  
    try {  
        const practicas = await this.vinculacionPracticaRepository.query(  
        `SELECT   
            vp."VINP_ID",   
            vp."VINP_FECHA_INICIO" AS "FECHA INICIO",   
            vp."VINP_FECHA_FIN" AS "FECHA FIN",   
            vp."VINP_HORAS_PRACTICAS" AS "HORAS PRÁCTICAS",  
            COUNT(vpe."VINPE_ID") AS "CANTIDAD PASANTES"  
        FROM   
            public.tbl_vinculacion_practica vp  
        LEFT JOIN   
            public.tbl_vinculacion_practica_estudiante vpe  
        ON   
            vp."VINP_ID" = vpe."VINP_ID"  
        WHERE   
            vp."VINE_ID" = \$1 
        GROUP BY   
            vp."VINP_ID",   
            vp."VINP_FECHA_INICIO",   
            vp."VINP_FECHA_FIN",   
            vp."VINP_HORAS_PRACTICAS"  
        ORDER BY   
            vp."VINP_ID" DESC`,  
        [vineId],  
        );  

        if (!practicas.length) {  
        throw new HttpException('No practices found for the given company ID', HttpStatus.NOT_FOUND);  
        }  

        return { success: true, data: practicas };  
    } catch (error) {  
        console.error('Error fetching practices for company:', error);  
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);  
    }  
  }  

}
