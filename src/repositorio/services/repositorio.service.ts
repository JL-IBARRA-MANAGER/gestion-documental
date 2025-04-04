import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalDominios } from '../../biblioteca/entities/global_dominios.entity';
import { ReglamentoAcademicoDto } from '../dtos/reglamento-academico.dto';
import { ReglamentoAcademico } from '../entities/reglamento-academico.entity';
import { UpdateReglamentoAcademicoDto } from '../dtos/update-reglamento-academico.dto';

import { CreateReglamentoAcademicoDto } from '../dtos/create-reglamento-academico.dto';
import * as FormData from 'form-data';
import axios from 'axios';

@Injectable()
export class RepositorioService {

  private readonly remoteServerUrl = process.env.REMOTE_SERVER_URL;

  constructor(
    @InjectRepository(GlobalDominios)
    private globalDominiosRepository: Repository<GlobalDominios>,
    @InjectRepository(ReglamentoAcademico)
    private readonly reglamentoAcademicoRepository: Repository<ReglamentoAcademico>,
  ) {}

  async getReglamentoAcademico(): Promise<any> {
    const reglamentos = await this.globalDominiosRepository.query(`
      SELECT "RRA_ID", "RRA_FECHA", "RRA_NOMBRE", "RRA_OBSERVACION", "RRA_RUTA"
      FROM public.tbl_repositorio_reglamento_regimen_academico
      WHERE "RRA_ESTADO" = 1
    `);

    const dominio = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });

    return {
      reglamentos: reglamentos.map(reg => ({
        RRA_ID: reg.RRA_ID,
        Fecha: reg.RRA_FECHA,
        Nombre: reg.RRA_NOMBRE,
        Observación: reg.RRA_OBSERVACION,
        Acción: reg.RRA_RUTA,
      })),
      dominio: dominio?.GDOM_DOMINIO,
      descripcion: dominio?.GDOM_DESCRIPCION,
    };
  }


 async registrarReglamentoAcademico(
    createReglamentoAcademicoDto: CreateReglamentoAcademicoDto,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    // Generar nombre único para el archivo
    const fileName = `${new Date().toISOString().replace(/[-:.]/g, '')}-${file.originalname}`;
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/uploadReglamentoAcademico`;

    // Subir archivo al servidor remoto
    const fileUrl = await this.uploadFileToRemoteServer(file, remoteUploadUrl, fileName);

    // Guardar datos en la base de datos
    return await this.reglamentoAcademicoRepository.query(
      `
      INSERT INTO public.tbl_repositorio_reglamento_regimen_academico 
      ("RRA_FECHA", "RRA_NOMBRE", "RRA_OBSERVACION", "RRA_RUTA", "RRA_ESTADO")
      VALUES ($1, $2, $3, $4, 1)
      RETURNING *;
      `,
      [
        createReglamentoAcademicoDto.RRA_FECHA,
        createReglamentoAcademicoDto.RRA_NOMBRE,
        createReglamentoAcademicoDto.RRA_OBSERVACION,
        fileUrl,
      ],
    );
  }


  // src/repository/services/repositorio.service.ts
  async editarReglamentoAcademico(
    updateReglamentoAcademicoDto: UpdateReglamentoAcademicoDto,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    // Generar un nombre único para el archivo
    const fileName = `${new Date().toISOString().replace(/[-:.]/g, '')}-${file.originalname}`;
    const remoteUploadUrl = `${this.remoteServerUrl}/index.php/uploadReglamentoAcademico`;

    // Subir archivo al servidor remoto
    const fileUrl = await this.uploadFileToRemoteServer(file, remoteUploadUrl, fileName);


    // Convertir RRA_ID a número
    const rraId = Number(updateReglamentoAcademicoDto.RRA_ID);
    if (isNaN(rraId)) {
      throw new HttpException('RRA_ID must be a valid number', HttpStatus.BAD_REQUEST);
    }

    // Actualizar registro en la base de datos
    await this.reglamentoAcademicoRepository.query(
      `
      UPDATE public.tbl_repositorio_reglamento_regimen_academico
      SET "RRA_FECHA" = $1, "RRA_NOMBRE" = $2, "RRA_OBSERVACION" = $3, "RRA_RUTA" = $4
      WHERE "RRA_ID" = $5
      `,
      [
        updateReglamentoAcademicoDto.RRA_FECHA,
        updateReglamentoAcademicoDto.RRA_NOMBRE,
        updateReglamentoAcademicoDto.RRA_OBSERVACION || '',
        fileUrl,
        rraId, 
      ],
    );

    return { message: 'Reglamento actualizado exitosamente', fileUrl };
  }



  // Método para subir el archivo al servidor remoto
  private async uploadFileToRemoteServer(
    file: Express.Multer.File,
    uploadUrl: string,
    fileName: string,
  ): Promise<string> {
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: fileName, contentType: file.mimetype });

    try {
      await axios.post(uploadUrl, formData, {
        headers: formData.getHeaders(),
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
      });
      return `/public/reglamento_academico/${fileName}`; // Ruta donde se guarda el archivo
    } catch (error) {
      throw new HttpException(`File upload failed: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
