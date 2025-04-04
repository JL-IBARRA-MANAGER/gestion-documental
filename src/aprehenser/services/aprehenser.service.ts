import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AprehenserPaginaWeb } from '../entities/aprehenser_pagina_web.entity';
import { GlobalDominios } from '../../biblioteca/entities/global_dominios.entity';
import { NoticiasImagenes } from '../entities/noticias_imagenes.entity';


import { Convocatoria } from '../entities/convocatoria.entity';
import { UpdateConvocatoriaDto } from '../dtos/update-convocatoria.dto';
import { CreateConvocatoriaDto } from '../dtos/create-convocatoria.dto';

import { CreateProyectoDetalleDto } from '../dtos/create-proyecto-detalle.dto';

import { Proyecto } from '../entities/proyecto.entity';
import { CreateProyectoDto } from '../dtos/create-proyecto.dto';
import { UpdateProyectoDto } from '../dtos/update-proyecto.dto';
import { CreateParticipanteDto } from '../dtos/create-participante.dto';  


import { UpdateProyectoDetalleDto } from '../dtos/update-proyecto-detalle.dto';
import { AprehenserProyectoDetalle } from '../entities/aprehenser_proyecto_detalle.entity';

import { CreateProyectoImagenDto } from '../dtos/create-proyecto-imagen.dto';

import { CreateNoticiasDto } from '../dtos/create-noticias.dto';
import { CreateNoticiaImagenDto } from '../dtos/create-noticia-imagen.dto';

import { AprehenserDesarrollo } from '../entities/aprehenser_desarrollo.entity'; 
import { UpdateDesarrolloFormacionDto } from '../dtos/update-desarrollo-formacion.dto';
import { UpdateCursoEstadoDto } from '../dtos/update-curso-estado.dto';
import { CreateCursoDto } from '../dtos/create-curso.dto';
import { CreateCursoRegistroDto } from '../dtos/create-curso-registro.dto';




import * as FormData from 'form-data';
import axios from 'axios';

@Injectable()
export class AprehenserService {
  private readonly remoteServerUrl = process.env.REMOTE_SERVER_URL;

  constructor(
    @InjectRepository(AprehenserPaginaWeb)
    private readonly aprehenserPaginaWebRepository: Repository<AprehenserPaginaWeb>,
    @InjectRepository(GlobalDominios)
    private readonly globalDominiosRepository: Repository<GlobalDominios>,
    @InjectRepository(Convocatoria) // Inyectamos el repositorio Convocatoria
    private readonly convocatoriaRepository: Repository<Convocatoria>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(NoticiasImagenes)
    private readonly noticiasImagenesRepository: Repository<NoticiasImagenes>,
    @InjectRepository(AprehenserDesarrollo)
    private readonly desarrolloRepository: Repository<AprehenserDesarrollo>,
  ) {}

  // Método para obtener el logo de PUCE-I
  async getLogoPuce() {
    const logoData = await this.aprehenserPaginaWebRepository.query(`
      SELECT "PAG_ID", "PAG_LOGO_PUCE"
      FROM public.tbl_aprehenser_pagina_web
      WHERE "MEN_ID" = 0
    `);

    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    return {
      logoData,
      dominio: dominio?.GDOM_DOMINIO,
    };
  }

  // Método para actualizar el logo de PUCE-I
  async updateLogoPuce(PAG_ID: number, file: Express.Multer.File): Promise<void> {
    const newFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/pagina_web_logo_puce`;

    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);

    const fileLink = `/public/pagina_web/${newFileName}`;

    await this.aprehenserPaginaWebRepository.update(PAG_ID, { logoPuce: fileLink });
  }

  // **Nuevo método para obtener el logo de Aprehenser**
  async getLogoAprehenser() {
    const logoData = await this.aprehenserPaginaWebRepository.query(`
      SELECT "PAG_ID", "PAG_LOGO"
      FROM public.tbl_aprehenser_pagina_web
      WHERE "MEN_ID" = 0
    `);
    
    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    return {
      logoData,
      dominio: dominio?.GDOM_DOMINIO,
    };

  }

  // **Nuevo método para actualizar el logo de Aprehenser**
  async updateLogoAprehenser(PAG_ID: number, file: Express.Multer.File): Promise<void> {
    const newFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/pagina_web_logo_puce`;

    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);

    const fileLink = `/public/pagina_web/${newFileName}`;

    await this.aprehenserPaginaWebRepository.update(PAG_ID, { logo: fileLink });
  }

  // **Nuevo método para obtener el texto del logo**
  async getLogoTexto() {
    const textoData = await this.aprehenserPaginaWebRepository.query(`
      SELECT "PAG_ID", "PAG_TEXTO"
      FROM public.tbl_aprehenser_pagina_web
      WHERE "MEN_ID" = 0
    `);
    return textoData;
  }

  // **Nuevo método para actualizar el texto del logo**
  async updateLogoTexto(PAG_ID: number, texto: string): Promise<void> {
    await this.aprehenserPaginaWebRepository.update(PAG_ID, { texto });
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
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
      });
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }

  // Método para obtener las imágenes del banner
  async getImagenesBanner(): Promise<{ imagenes: any[], dominio: string | null }> {
    // Primero obtenemos el PAG_ID donde MEN_ID = 0
    const pagData = await this.aprehenserPaginaWebRepository.query(`
      SELECT "PAG_ID"
      FROM public.tbl_aprehenser_pagina_web
      WHERE "MEN_ID" = 0
    `);

    // Si no hay resultados, devolvemos un error
    if (!pagData || pagData.length === 0) {
      throw new HttpException('No se encontró un PAG_ID válido', HttpStatus.NOT_FOUND);
    }

    const pagId = pagData[0].PAG_ID;

    // Luego obtenemos las imágenes del banner correspondientes al PAG_ID
    const imagenesBanner = await this.aprehenserPaginaWebRepository.query(`
      SELECT "PWC_ID", "PWC_IMAGEN"
      FROM public.tbl_aprehenser_pagina_web_banner
      WHERE "PAG_ID" = $1
    `, [pagId]);

    // Ahora obtenemos el dominio
    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    // Devolvemos las imágenes del banner junto con el dominio
    return {
      imagenes: imagenesBanner,
      dominio: dominio?.GDOM_DOMINIO || null,  // Si no existe dominio, se devuelve null
    };
  }

  // Método para actualizar la imagen del banner
  async updateImagenBanner(PWC_ID: number, file: Express.Multer.File): Promise<void> {
    // Generar un nuevo nombre de archivo para la imagen
    const newFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/pagina_web_logo_puce`;

    // Subir el archivo al servidor remoto
    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);

    // Enlace del archivo subido
    const fileLink = `/public/pagina_web/${newFileName}`;

    // Actualizar el campo PWC_IMAGEN en la base de datos para el PWC_ID correspondiente
    await this.aprehenserPaginaWebRepository.query(
      `
      UPDATE public.tbl_aprehenser_pagina_web_banner
      SET "PWC_IMAGEN" = $1
      WHERE "PWC_ID" = $2
      `,
      [fileLink, PWC_ID],
    );
  }

  async getVideo(): Promise<any> {
    const videoData = await this.aprehenserPaginaWebRepository.query(`
      SELECT "PAG_ID", "PAG_VIDEO"
      FROM public.tbl_aprehenser_pagina_web
      WHERE "MEN_ID" = 0
    `);

    if (!videoData || videoData.length === 0) {
      throw new HttpException('No se encontró un video disponible', HttpStatus.NOT_FOUND);
    }

    //return videoData[0];

    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    
    return {
      video: videoData[0],
      dominio: dominio?.GDOM_DOMINIO || null,  // Si no existe dominio, se devuelve null
    };

  }

  async updateVideo(PAG_ID: number, file: Express.Multer.File): Promise<void> {
    const newFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/pagina_web_logo_puce`;

    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);

    const fileLink = `/public/pagina_web/${newFileName}`;

    await this.aprehenserPaginaWebRepository.query(`
      UPDATE public.tbl_aprehenser_pagina_web
      SET "PAG_VIDEO" = $1
      WHERE "PAG_ID" = $2
    `, [fileLink, PAG_ID]);
  }

  async getNosotros(): Promise<any> {
    const nosotrosData = await this.aprehenserPaginaWebRepository.query(`
      SELECT "PAG_ID", "PAG_NOSOTROS"
      FROM public.tbl_aprehenser_pagina_web
      WHERE "MEN_ID" = 0
    `);

    if (!nosotrosData || nosotrosData.length === 0) {
      throw new HttpException('No se encontró texto sobre nosotros', HttpStatus.NOT_FOUND);
    }

    return nosotrosData[0];
  }


  async updateNosotros(PAG_ID: number, PAG_NOSOTROS: string): Promise<void> {
    await this.aprehenserPaginaWebRepository.query(`
      UPDATE public.tbl_aprehenser_pagina_web
      SET "PAG_NOSOTROS" = $1
      WHERE "PAG_ID" = $2
    `, [PAG_NOSOTROS, PAG_ID]);
  }


//Convocatoria

  async getProyectosConvocatoria(): Promise<any> {

    const convocatorias = await this.convocatoriaRepository.query(`
      SELECT 
        "CONV_TITULO" AS "Edición", 
        "CONV_NOMBRE" AS "Convocatoria", 
        "CONV_IMAGEN" AS "Imagen", 
        "CONV_REVISTA" AS "Revista", 
        "CONV_TEXTO" AS "Detalle",
        "CONV_ID" AS "Acción"
      FROM public.tbl_aprehenser_categoria_convocatoria
      WHERE "CAT_ID" = 1 AND "CONV_ESTADO" = 1
    `);

    // Ahora obtenemos el dominio
    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    // Devolvemos las imágenes del banner junto con el dominio
    return {
      Convocatorias: convocatorias,
      dominio: dominio?.GDOM_DOMINIO || null,  // Si no existe dominio, se devuelve null
    };



  }

  async updateProyectosConvocatoria(
    updateConvocatoriaDto: UpdateConvocatoriaDto,
    file: Express.Multer.File
  ): Promise<void> {
    const newFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/convocatoria_imagen`;

    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);

    const fileLink = `/public/pagina_web/convocatorias/${newFileName}`;

    await this.convocatoriaRepository.query(`
      UPDATE public.tbl_aprehenser_categoria_convocatoria
      SET 
        "CONV_TITULO" = $1, 
        "CONV_NOMBRE" = $2, 
        "CONV_IMAGEN" = $3, 
        "CONV_REVISTA" = $4, 
        "CONV_TEXTO" = $5, 
        "CONV_ESTADO" = $6
      WHERE "CONV_ID" = $7
    `, [
      updateConvocatoriaDto.CONV_TITULO, 
      updateConvocatoriaDto.CONV_NOMBRE, 
      fileLink, 
      updateConvocatoriaDto.CONV_REVISTA, 
      updateConvocatoriaDto.CONV_TEXTO, 
      updateConvocatoriaDto.CONV_ESTADO, 
      updateConvocatoriaDto.CONV_ID
    ]);
  }

  async createProyectosConvocatoria(
    createConvocatoriaDto: CreateConvocatoriaDto,
    file: Express.Multer.File
  ): Promise<void> {
    const newFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/convocatoria_imagen`;

    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);

    const fileLink = `/public/pagina_web/convocatorias/${newFileName}`;

    await this.convocatoriaRepository.query(`
      INSERT INTO public.tbl_aprehenser_categoria_convocatoria (
        "CONV_TITULO", "CONV_NOMBRE", "CONV_IMAGEN", "CONV_REVISTA", "CONV_TEXTO", "CAT_ID", "CONV_ESTADO"
      )
      VALUES ($1, $2, $3, $4, $5, 1, 1)
    `, [
      createConvocatoriaDto.CONV_TITULO, 
      createConvocatoriaDto.CONV_NOMBRE, 
      fileLink, 
      createConvocatoriaDto.CONV_REVISTA, 
      createConvocatoriaDto.CONV_TEXTO
    ]);
  }


  // Método GET para obtener proyectos por convocatoria
  async getProyectosPorConvocatoria(CONV_ID: number): Promise<any> {
    const proyectosConvocatoria = await this.proyectoRepository.query(`
      SELECT 
        "PRO_NOMBRE" AS "Proyecto", 
        "PRO_IMAGEN" AS "Imagen", 
        "PRO_EN_MARCHA" AS "Estado del proyecto",
        "PRO_ID" AS "Acción" 
      FROM public.tbl_aprehenser_categoria_convocatoria_proyecto
      WHERE "CONV_ID" = $1 AND "PRO_ESTADO" = 1
    `, [CONV_ID]);

    // Buscar el dominio
    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    // Devolver todos los datos como un objeto
    return {
      proyectos: proyectosConvocatoria,
      dominio: dominio?.GDOM_DOMINIO || null,
    };
  }





  // Método PUT para actualizar un proyecto
  async updateProyecto(updateProyectoDto: UpdateProyectoDto, file: Express.Multer.File): Promise<void> {
    const newFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/proyectos`;

    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);
    const fileLink = `/public/pagina_web/proyectos/${newFileName}`;

    await this.proyectoRepository.query(`
      UPDATE public.tbl_aprehenser_categoria_convocatoria_proyecto
      SET 
        "PRO_NOMBRE" = $1, 
        "PRO_IMAGEN" = $2, 
        "PRO_EN_MARCHA" = $3, 
        "PRO_ESTADO" = $4
      WHERE "PRO_ID" = $5
    `, [
      updateProyectoDto.PRO_NOMBRE, 
      fileLink, 
      updateProyectoDto.PRO_EN_MARCHA, 
      updateProyectoDto.PRO_ESTADO, 
      updateProyectoDto.PRO_ID
    ]);
  }

  // Método POST para crear un nuevo proyecto
  async createProyecto(createProyectoDto: CreateProyectoDto, file: Express.Multer.File): Promise<void> {
    const newFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/proyectos`;

    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);
    const fileLink = `/public/pagina_web/proyectos/${newFileName}`;

    await this.proyectoRepository.query(`
      INSERT INTO public.tbl_aprehenser_categoria_convocatoria_proyecto (
        "PRO_NOMBRE", "PRO_IMAGEN", "CONV_ID", "PRO_EN_MARCHA", "PRO_ESTADO"
      )
      VALUES ($1, $2, $3, 1, 1)
    `, [
      createProyectoDto.PRO_NOMBRE, 
      fileLink, 
      createProyectoDto.CONV_ID
    ]);
  }


   async updateProyectoDetalle(updateProyectoDetalleDto: UpdateProyectoDetalleDto, file?: Express.Multer.File): Promise<void> {
    const { DETP_ID, DETP_COORDINADOR, DETP_ESCUELAS, DETP_LINEACION, DETP_DESCRIPCION } = updateProyectoDetalleDto;

    // Crear un objeto con los campos opcionales enviados
    const updateFields = [];
    const updateValues = [];

    if (DETP_COORDINADOR) {
      updateFields.push(`"DETP_COORDINADOR" = $${updateFields.length + 1}`);
      updateValues.push(DETP_COORDINADOR);
    }
    if (DETP_ESCUELAS) {
      updateFields.push(`"DETP_ESCUELAS" = $${updateFields.length + 1}`);
      updateValues.push(DETP_ESCUELAS);
    }
    if (DETP_LINEACION) {
      updateFields.push(`"DETP_LINEACION" = $${updateFields.length + 1}`);
      updateValues.push(DETP_LINEACION);
    }
    if (DETP_DESCRIPCION) {
      updateFields.push(`"DETP_DESCRIPCION" = $${updateFields.length + 1}`);
      updateValues.push(DETP_DESCRIPCION);
    }

    // Si el archivo de video fue subido
    if (file) {
      const newFileName = this.generateFileName(file.originalname);
      const remoteUploadUrl = `${this.remoteServerUrl}/index.php/proyectos_video`;

      // Subir el video al servidor remoto
      await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);

      // Ruta del video en el servidor remoto
      const fileLink = `/public/pagina_web/proyectos/videos/${newFileName}`;

      // Agregar campo para actualizar en la tabla
      updateFields.push(`"DETP_VIDEO" = $${updateFields.length + 1}`);
      updateValues.push(fileLink);
    }

    if (updateFields.length === 0) {
      throw new HttpException('No fields to update', HttpStatus.BAD_REQUEST);
    }

    // Agregar DETP_ID para la cláusula WHERE
    updateValues.push(DETP_ID);

    // Ejecutar la consulta SQL para actualizar la tabla
    const query = `
      UPDATE public.tbl_aprehenser_categoria_convocatoria_proyecto_detalle
      SET ${updateFields.join(', ')}
      WHERE "DETP_ID" = $${updateFields.length + 1};
    `;

    await this.proyectoRepository.query(query, updateValues);
  }


   // Método GET para obtener el detalle completo de un proyecto
  async getDetalleProyecto(PRO_ID: number): Promise<any> {
    // Obtener el detalle del proyecto
    const detalleProyecto = await this.proyectoRepository.query(`
      SELECT 
        pd."DETP_ID", 
        p."PRO_NOMBRE" AS "Proyecto",
        pd."DETP_COORDINADOR" AS "Coordinador", 
        pd."DETP_ESCUELAS" AS "Escuela", 
        pd."DETP_LINEACION" AS "Lineación", 
        pd."DETP_DESCRIPCION" AS "Descripción", 
        pd."DETP_VIDEO" AS "Video"
      FROM public.tbl_aprehenser_categoria_convocatoria_proyecto_detalle pd
      JOIN public.tbl_aprehenser_categoria_convocatoria_proyecto p 
        ON p."PRO_ID" = pd."PRO_ID"
      WHERE pd."PRO_ID" = $1
    `, [PRO_ID]);

    if (!detalleProyecto.length) {
      throw new HttpException('No se encontró el detalle del proyecto', HttpStatus.NOT_FOUND);
    }

    // Obtener las fotos del proyecto
    const fotosProyecto = await this.proyectoRepository.query(`
      SELECT 
        "PROI_IMAGENE" AS "Imagen",
        "PROI_ID" AS "Acción" 
      FROM public.tbl_aprehenser_categoria_convocatoria_proyecto_imagenes
      WHERE "PRO_ID" = $1 AND "PROI_ESTADO" = 1
    `, [PRO_ID]);

    // Obtener los participantes del proyecto
    const participantesProyecto = await this.proyectoRepository.query(`
      SELECT 
        "PPRO_NOMBRE" AS "Nombre", 
        CASE 
          WHEN "PPRO_TIPO_PARTICIPANTE" = 1 THEN 'Docente' 
          WHEN "PPRO_TIPO_PARTICIPANTE" = 2 THEN 'Estudiante' 
          ELSE 'Otro' 
        END AS "Tipo",
        "PPRO_ID" AS "Acción"
      FROM public.tbl_aprehenser_categoria_convocatoria_proyecto_participante
      WHERE "PRO_ID" = $1 AND "PPRO_ESTADO" = 1
    `, [PRO_ID]);

    // Buscar el dominio
    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    // Devolver todos los datos como un objeto
    return {
      proyecto: detalleProyecto[0],
      fotos: fotosProyecto,
      participantes: participantesProyecto,
      dominio: dominio?.GDOM_DOMINIO || null,
    };
  }


 // Servicio para agregar un participante a un proyecto
  async addParticipante(createParticipanteDto: CreateParticipanteDto): Promise<void> {
    const { PRO_ID, PPRO_NOMBRE, PPRO_TIPO_PARTICIPANTE } = createParticipanteDto;

    // Insertar participante en la tabla de participantes
    await this.proyectoRepository.query(`
      INSERT INTO public.tbl_aprehenser_categoria_convocatoria_proyecto_participante
        ("PRO_ID", "PPRO_NOMBRE", "PPRO_TIPO_PARTICIPANTE", "PPRO_ESTADO")
      VALUES ($1, $2, $3, 1)  -- El estado 1 significa que el participante está activo
    `, [PRO_ID, PPRO_NOMBRE, PPRO_TIPO_PARTICIPANTE]);
  }

  // Servicio para obtener los tipos de participantes disponibles
  async getTiposParticipantes(): Promise<any> {
    // Realizar la consulta para obtener los tipos de participantes con estado activo
    const tiposParticipantes = await this.proyectoRepository.query(`
      SELECT "CATTP_ID", "CAT_NOMBRE"
      FROM public.tbl_aprehenser_categoria_tipo_participante
      WHERE "CAT_ESTADO" = 1
    `);

    return tiposParticipantes;
  } 


  async agregarImagenProyecto(createProyectoImagenDto: CreateProyectoImagenDto, file: Express.Multer.File): Promise<void> {
    const { PRO_ID } = createProyectoImagenDto;

    // Generar un nuevo nombre de archivo
    const newFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/proyectos`;

    // Subir el archivo al servidor remoto
    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);

    const fileLink = `/public/pagina_web/proyectos/${newFileName}`;

    // Insertar en la base de datos
    await this.proyectoRepository.query(`
      INSERT INTO public.tbl_aprehenser_categoria_convocatoria_proyecto_imagenes ("PRO_ID", "PROI_IMAGENE", "PROI_NOTICIA", "PROI_ESTADO")
      VALUES ($1, $2, null, 1)  -- Asumimos que PROI_NOTICIA no es necesario y se puede dejar como NULL
    `, [PRO_ID, fileLink]);
  }


  async agregarProyectoDetalle(createProyectoDetalleDto: CreateProyectoDetalleDto, file: Express.Multer.File): Promise<void> {
    const { PRO_ID, DETP_COORDINADOR, DETP_ESCUELAS, DETP_LINEACION, DETP_DESCRIPCION } = createProyectoDetalleDto;

    // Generar un nuevo nombre de archivo para el video
    const newFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/proyectos_video`;

    // Subir el archivo al servidor remoto
    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);

    const fileLink = `/public/pagina_web/proyectos/videos/${newFileName}`;

    // Realizar la inserción en la tabla
    await this.proyectoRepository.query(`
      INSERT INTO public.tbl_aprehenser_categoria_convocatoria_proyecto_detalle 
      ("PRO_ID", "DETP_COORDINADOR", "DETP_ESCUELAS", "DETP_LINEACION", "DETP_DESCRIPCION", "DETP_VIDEO")
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [PRO_ID, DETP_COORDINADOR, DETP_ESCUELAS, DETP_LINEACION, DETP_DESCRIPCION, fileLink]);
  }


    async getNoticias(): Promise<any> {
        // Primero, obtenemos el logo
        const logo = await this.aprehenserPaginaWebRepository.query(`
            SELECT 
                "PAG_LOGO" AS texto_logo
            FROM 
                public.tbl_aprehenser_pagina_web
            WHERE 
                "MEN_ID" = 4
        `);

        // Luego, obtenemos las noticias activas
        const noticias = await this.aprehenserPaginaWebRepository.query(`
            SELECT 
                n."PAGN_ID",
                n."PAGN_TITULO",
                n."PAGN_TEXTO",
                n."PAGN_AUTOR",
                ni."PGNI_IMAGEN",
                ni."PGNI_PORTADA"
            FROM 
                public.tbl_aprehenser_pagina_web_noticias n
            LEFT JOIN 
                public.tbl_aprehenser_pagina_web_noticias_imagenes ni ON n."PAGN_ID" = ni."PAGN_ID" 
                AND ni."PAGNI_ESTADO" = 1 AND ni."PGNI_PORTADA" = 1
            WHERE 
                n."PAGN_ESTADO" = 1
            ORDER BY 
                n."PAGN_ORDEN", ni."PGNI_ID" ASC
        `);

        // Estructuramos las noticias para agrupar las imágenes asociadas a cada noticia
        const finalResult = {
            texto_logo: logo.length > 0 ? logo[0].texto_logo : null,
            noticias: []
        };
        
        for (const row of noticias) {
            if (!finalResult.noticias[row.PAGN_ID]) {
                finalResult.noticias[row.PAGN_ID] = {
                    Título: row.PAGN_TITULO,
                    Texto: row.PAGN_TEXTO,
                    Autor: row.PAGN_AUTOR,
                    Acción: row.PAGN_ID,
                    IMAGENES: []
                };
            }
            // Limitar a solo 2 imágenes por noticia
            if (finalResult.noticias[row.PAGN_ID].IMAGENES.length < 2 && row.PGNI_IMAGEN) {
                finalResult.noticias[row.PAGN_ID].IMAGENES.push(row.PGNI_IMAGEN);
            }
        }

        // Convertimos las noticias en una lista
        finalResult.noticias = Object.values(finalResult.noticias);

        // Obtener el dominio del servidor remoto
        const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

        // Devolver todos los datos como un objeto
        return {
            texto_logo: finalResult.texto_logo,
            noticias: finalResult.noticias,
            dominio: dominio?.GDOM_DOMINIO || null,  // Agregar el dominio a la respuesta
        };
    }


    async getNoticiasDesactivadas(): Promise<any> {
        // Primero, obtenemos el logo
        const logo = await this.aprehenserPaginaWebRepository.query(`
            SELECT 
                "PAG_LOGO" AS texto_logo
            FROM 
                public.tbl_aprehenser_pagina_web
            WHERE 
                "MEN_ID" = 4
        `);

        // Luego, obtenemos las noticias activas
        const noticias = await this.aprehenserPaginaWebRepository.query(`
            SELECT 
                n."PAGN_ID",
                n."PAGN_TITULO",
                n."PAGN_TEXTO",
                n."PAGN_AUTOR",
                ni."PGNI_IMAGEN",
                ni."PGNI_PORTADA"
            FROM 
                public.tbl_aprehenser_pagina_web_noticias n
            LEFT JOIN 
                public.tbl_aprehenser_pagina_web_noticias_imagenes ni ON n."PAGN_ID" = ni."PAGN_ID" 
                AND ni."PAGNI_ESTADO" = 1 AND ni."PGNI_PORTADA" = 1
            WHERE 
                n."PAGN_ESTADO" = 0
            ORDER BY 
                n."PAGN_ORDEN", ni."PGNI_ID" ASC
        `);

        // Estructuramos las noticias para agrupar las imágenes asociadas a cada noticia
        const finalResult = {
            texto_logo: logo.length > 0 ? logo[0].texto_logo : null,
            noticias: []
        };
        
        for (const row of noticias) {
            if (!finalResult.noticias[row.PAGN_ID]) {
                finalResult.noticias[row.PAGN_ID] = {
                    Título: row.PAGN_TITULO,
                    Texto: row.PAGN_TEXTO,
                    Autor: row.PAGN_AUTOR,
                    Acción: row.PAGN_ID,
                    IMAGENES: []
                };
            }
            // Limitar a solo 2 imágenes por noticia
            if (finalResult.noticias[row.PAGN_ID].IMAGENES.length < 2 && row.PGNI_IMAGEN) {
                finalResult.noticias[row.PAGN_ID].IMAGENES.push(row.PGNI_IMAGEN);
            }
        }

        // Convertimos las noticias en una lista
        finalResult.noticias = Object.values(finalResult.noticias);

        // Obtener el dominio del servidor remoto
        const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

        // Devolver todos los datos como un objeto
        return {
            texto_logo: finalResult.texto_logo,
            noticias: finalResult.noticias,
            dominio: dominio?.GDOM_DOMINIO || null,  // Agregar el dominio a la respuesta
        };
    }

    async createNoticias(createNoticiasDto: CreateNoticiasDto): Promise<void> {
        const { PAGN_TITULO, PAGN_TEXTO, PAGN_AUTOR } = createNoticiasDto;

        await this.aprehenserPaginaWebRepository.query(`
            INSERT INTO public.tbl_aprehenser_pagina_web_noticias 
            ("PAGN_TITULO", "PAGN_TEXTO", "PAGN_AUTOR", "PAGN_ORDEN", "PAGN_ESTADO") 
            VALUES ($1, $2, $3, 0, 1)
        `, [PAGN_TITULO, PAGN_TEXTO, PAGN_AUTOR]);
    }



  async getNoticiasFotos(PAGN_ID: number): Promise<any[]> {
    return this.noticiasImagenesRepository.query(`
      SELECT "PGNI_ID", "PAGN_ID", "PGNI_IMAGEN", "PGNI_VIDEO", "PGNI_PORTADA", "PAGNI_ESTADO"
      FROM public.tbl_aprehenser_pagina_web_noticias_imagenes
      WHERE "PAGN_ID" = $1 AND "PAGNI_ESTADO" = 1
    `, [PAGN_ID]);
  }

  async agregarFotoANoticia(dto: CreateNoticiaImagenDto, file: Express.Multer.File): Promise<void> {
    const newFileName = this.generateFileName(file.originalname);
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/noticias-fotos`; 

    // Subir el archivo al servidor remoto
    await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);

    const fileLink = `/public/pagina_web/noticias/${newFileName}`;

    await this.noticiasImagenesRepository.query(`
      INSERT INTO public.tbl_aprehenser_pagina_web_noticias_imagenes ("PAGN_ID", "PGNI_IMAGEN", "PAGNI_ESTADO")
      VALUES ($1, $2, 1)
    `, [dto.PAGN_ID, fileLink]);
  }

  async deleteFoto(PGNI_ID: number): Promise<void> {
    const result = await this.noticiasImagenesRepository.query(`
      DELETE FROM public.tbl_aprehenser_pagina_web_noticias_imagenes
      WHERE "PGNI_ID" = $1
    `, [PGNI_ID]);

    if (result.affected === 0) {
      throw new HttpException('Foto not found or already deleted', HttpStatus.NOT_FOUND);
    }
  }

    async toggleFotoPortada(PGNI_ID: number): Promise<void> {
        // Buscar la imagen por su ID
        const foto = await this.noticiasImagenesRepository.findOne({ where: { PGNI_ID } });
    
        // Verificar si la imagen existe
        if (!foto) {
        throw new HttpException('Foto no encontrada', HttpStatus.NOT_FOUND);
        }
    
        // Alternar el valor de PGNI_PORTADA entre true y false
        const nuevoEstado = !foto.PGNI_PORTADA;
    
        // Actualizar el campo PGNI_PORTADA en la base de datos
        await this.noticiasImagenesRepository.update(PGNI_ID, { PGNI_PORTADA: nuevoEstado });
    }
    
  async getDesarrolloFormacionTitulo() {
    return await this.desarrolloRepository.query(`
      SELECT "DES_ID", "DES_NOMBRE", "DES_TEXTO" 
      FROM public.tbl_aprehenser_desarrollo
      WHERE "DES_ESTADO" = 1
    `);
  }

  // Actualizar título y descripción según el ID
  async updateDesarrolloFormacionTitulo(
    updateDesarrolloFormacionDto: UpdateDesarrolloFormacionDto
  ) {
    const { DES_ID, DES_NOMBRE, DES_TEXTO } = updateDesarrolloFormacionDto;

    if (!DES_ID) {
      throw new HttpException('DES_ID is required', HttpStatus.BAD_REQUEST);
    }

    const fieldsToUpdate: string[] = [];
    if (DES_NOMBRE) fieldsToUpdate.push(`"DES_NOMBRE" = '${DES_NOMBRE}'`);
    if (DES_TEXTO) fieldsToUpdate.push(`"DES_TEXTO" = '${DES_TEXTO}'`);

    if (fieldsToUpdate.length === 0) {
      throw new HttpException('No fields to update', HttpStatus.BAD_REQUEST);
    }

    const query = `
      UPDATE public.tbl_aprehenser_desarrollo 
      SET ${fieldsToUpdate.join(', ')}
      WHERE "DES_ID" = ${DES_ID}
    `;

    await this.desarrolloRepository.query(query);
    return { message: 'Desarrollo actualizado correctamente' };
  }


  async getDesarrolloFormacionAmbito(desId: number) {
    // Obtener el dominio del servidor remoto
    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    // Ejecutar la consulta para obtener los ámbitos
    const ambitos = await this.desarrolloRepository.query(`
      SELECT "AMB_ID", "AMB_NOMBRE", "AMB_IMAGEN", "AMB_TEXTO"
      FROM public.tbl_aprehenser_desarrollo_ambito
      WHERE "AMB_ESTADO" = 1 AND "DES_ID" = $1
    `, [desId]);

    // Devolver los resultados junto con el dominio
    return {
      ambitos,
      dominio: dominio?.GDOM_DOMINIO || null,  // Agregar el dominio a la respuesta
    };
  }

  async getDesarrolloFormacionAmbitoCursos(ambId: number) {
    // Obtener el dominio del servidor remoto
    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    // Ejecutar la consulta para obtener los cursos por ámbito
    const cursos = await this.desarrolloRepository.query(`
      SELECT 
        a."DESC_ID", 
        a."DESC_TEMA" AS "Tema", 
        a."DESC_DURACION" AS "Duración", 
        a."DESC_ITINERARIO" AS "Itinerario", 
        a."DESC_FECHADESDE" AS "Fecha inicio", 
        a."DESC_FECHAHASTA" AS "Fecha fin", 
        b."EDC_NOMBRE", 
        a."DESC_IMAGEN" AS "Imagen", 
        c."TDC_TIPO", 
        a."DESC_VALOR" AS "Valor", 
        a."DESC_CONTENIDO" AS "Contenido"
      FROM public."tbl_aprehenser_desarrollo_curso" a
      JOIN public."tbl_aprehenser_desarrollo_curso_estado" b ON a."EDC_ID" = b."EDC_ID"
      JOIN public."tbl_aprehenser_desarrollo_curso_tipo" c ON a."TDC_ID" = c."TDC_ID"
      WHERE a."AMB_ID" = $1
    `, [ambId]);

    // Devolver los resultados junto con el dominio
    return {
      cursos,
      dominio: dominio?.GDOM_DOMINIO || null,  // Agregar el dominio a la respuesta
    };
  }


  async getDesarrolloFormacionAmbitoCursosRegistros(descId: number) {
    return await this.desarrolloRepository.query(`
      SELECT 
        "REC_NOMBRES" AS "Participante", 
        "REC_CORREO" AS "Correo", 
        "REC_CEDULA" AS "Cédula", 
        "REC_TELEFONO" AS "Teléfono", 
        "REC_RESPALDO" AS "Respaldo",
        CASE 
            WHEN "REC_ESTADO" = 1 THEN 'Inscrito' 
            WHEN "REC_ESTADO" = 2 THEN 'Finalizado' 
            WHEN "REC_ESTADO" = 3 THEN 'Reprobado' 
            ELSE 'Otro' 
        END AS "Estado",
        "REC_ID" AS "Acción"
      FROM public.tbl_aprehenser_desarrollo_curso_registro
      WHERE "DESC_ID" = $1
    `, [descId]);
  }

  async updateCursoEstado(updateCursoEstadoDto: UpdateCursoEstadoDto) {
    const { REC_ID, REC_ESTADO } = updateCursoEstadoDto;

    // Ejecutar la consulta para actualizar el estado del participante en el curso
    await this.desarrolloRepository.query(
      `
      UPDATE public.tbl_aprehenser_desarrollo_curso_registro
      SET "REC_ESTADO" = $1
      WHERE "REC_ID" = $2
      `,
      [REC_ESTADO, REC_ID]
    );

    return { message: 'Estado actualizado correctamente' };
  }

    async createCurso(createCursoDto: CreateCursoDto, file: Express.Multer.File) {
        const {
        DESC_TEMA,
        DESC_DURACION,
        DESC_ITINERARIO,
        DESC_FECHADESDE,
        DESC_FECHAHASTA,
        AMB_ID,
        EDC_ID,
        DESC_ESTADO,
        TDC_ID,
        DESC_VALOR,
        DESC_CONTENIDO,
        } = createCursoDto;
    
        // Generar un nuevo nombre para el archivo y cargarlo en el servidor remoto
        const newFileName = this.generateFileName(file.originalname);
        const remoteUploadUrl = `${this.remoteServerUrl}/index.php/uploadCursoImagen`;
    
        await this.uploadFileToRemoteServer(file, remoteUploadUrl, newFileName);
        const fileLink = `/public/cursos/${newFileName}`;
    
        // Insertar el nuevo curso en la base de datos
        await this.desarrolloRepository.query(
        `
        INSERT INTO public.tbl_aprehenser_desarrollo_curso (
            "DESC_TEMA", "DESC_DURACION", "DESC_ITINERARIO", "DESC_FECHADESDE",
            "DESC_FECHAHASTA", "AMB_ID", "EDC_ID", "DESC_ESTADO", "DESC_IMAGEN",
            "TDC_ID", "DESC_VALOR", "DESC_CONTENIDO"
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `,
        [
            DESC_TEMA,
            DESC_DURACION,
            DESC_ITINERARIO,
            DESC_FECHADESDE,
            DESC_FECHAHASTA,
            Number(AMB_ID),
            Number(EDC_ID),
            Number(DESC_ESTADO),
            fileLink,
            Number(TDC_ID),
            parseFloat(DESC_VALOR),
            DESC_CONTENIDO,
        ]
        );
    
        return { message: 'Curso creado exitosamente' };
    }


  async registrarParticipanteCurso(createCursoRegistroDto: CreateCursoRegistroDto): Promise<void> {
    const { DESC_ID, REC_NOMBRES, REC_CORREO, REC_CEDULA, REC_TELEFONO } = createCursoRegistroDto;

    // Ejecutar la consulta de inserción
    await this.desarrolloRepository.query(
      `
      INSERT INTO public.tbl_aprehenser_desarrollo_curso_registro
      ("DESC_ID", "REC_NOMBRES", "REC_CORREO", "REC_CEDULA", "REC_TELEFONO", "REC_ESTADO")
      VALUES ($1, $2, $3, $4, $5, 1)
      `,
      [DESC_ID, REC_NOMBRES, REC_CORREO, REC_CEDULA, REC_TELEFONO]
    );
  }


}
