import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateActaDto } from '../dtos/create-acta.dto';
import { UpdateActaDto } from '../dtos/update-acta.dto';
import { UpdateActaEstadoDto } from '../dtos/update-acta-estado.dto';
import { FindByCarreraIdResponseDto } from '../dtos/find-by-carrera-id-response.dto';
import { CreateActaArchivoDto } from '../dtos/create-acta-archivo.dto';

import { Acta } from '../entities/acta.entity';
import { GlobalDominios } from '../../biblioteca/entities/global_dominios.entity'; 

import * as FormData from 'form-data';
import axios from 'axios';



@Injectable()
export class ActasService {

  private readonly remoteServerUrl = process.env.REMOTE_SERVER_URL;

  constructor(
    @InjectRepository(Acta)
    private readonly actaRepository: Repository<Acta>,
    @InjectRepository(GlobalDominios)
    private readonly globalDominiosRepository: Repository<GlobalDominios>,  
  ) {}

  async findByCarreraId(carreraId: number): Promise<FindByCarreraIdResponseDto> {
    const dominios = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });
    const actas = await this.actaRepository.query(
      `SELECT * FROM public.tbl_actas_consejo WHERE "CAR_ID" = $1 AND "ACT_ESTADO" = 1`,
      [carreraId],
    );

    return { actas, dominio: dominios?.GDOM_DOMINIO, descripcion: dominios?.GDOM_DESCRIPCION };
  }


    async findById(idACTA: number): Promise<any> {
    return this.actaRepository.query(`
        SELECT 
        "ACT_ID", 
        "CAR_ID", 
        "ACT_FECHA", 
        "ACT_OBSERVACION", 
        "ACT_ORDEN", 
        "ACT_DIRECCION", 
        "ACT_CONVOCATORIA", 
        "ACT_TIPO"
        FROM 
        public."tbl_actas_consejo" 
        WHERE 
        "ACT_ID" = $1
    `, [idACTA]);
    }


  async updateEstado(id: number, updateEstadoDto: UpdateActaEstadoDto) {
    return this.actaRepository.update({ id }, { estado: updateEstadoDto.estado });
  }

  async createActa(createActaDto: CreateActaDto, filePath: string) {
    const acta = this.actaRepository.create({
      ...createActaDto,
      direccion: filePath,
    });
    return this.actaRepository.save(acta);
  }




  // Método para crear el acta y subir el archivo de Acta al servidor remoto
  async createActaConArchivo(
    createActaArchivoDto: CreateActaArchivoDto,
    actaFile: Express.Multer.File,
  ): Promise<Acta> {
    if (!actaFile) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    const newActaFileName = this.generateFileName(actaFile.originalname);
    const actaUploadUrl = `${this.remoteServerUrl}/index.php/actas`;

    await this.uploadFileToRemoteServer(actaFile, actaUploadUrl, newActaFileName);
    const actaFilePath = `/public/pdf/${newActaFileName}`;

    const nuevaActa = this.actaRepository.create({
      carreraId: Number(createActaArchivoDto.carreraId),
      fecha: new Date(createActaArchivoDto.fecha),
      observacion: createActaArchivoDto.observacion,
      orden: createActaArchivoDto.orden,
      tipo: Number(createActaArchivoDto.tipo),
      direccion: actaFilePath,  // Enlace al archivo Acta
      estado: 1,
    });

    return this.actaRepository.save(nuevaActa);
  }

  // Método para actualizar una acta
  async updateActa(
    id: number,
    updateActaDto: UpdateActaDto,
    actaFile: Express.Multer.File | null
  ): Promise<any> {
    const acta = await this.actaRepository.findOne({ where: { id } });
    if (!acta) {
      throw new HttpException('Acta not found', HttpStatus.NOT_FOUND);
    }

    // Manejar el archivo Acta
    if (actaFile) {
      const newActaFileName = this.generateFileName(actaFile.originalname);
      const actaUploadUrl = `${this.remoteServerUrl}/index.php/actas`;
      await this.uploadFileToRemoteServer(actaFile, actaUploadUrl, newActaFileName);
      acta.direccion = `/public/pdf/${newActaFileName}`;
    }

    // Actualizar los campos de la acta
    acta.fecha = new Date(updateActaDto.fecha);
    acta.observacion = updateActaDto.observacion;
    acta.orden = updateActaDto.orden;

    // Guardar la acta actualizada en la base de datos
    return this.actaRepository.save(acta);
  }


  // Método unificado para subir archivos al servidor remoto
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
      throw new HttpException(`File upload failed: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Generar nombre único para los archivos
  private generateFileName(originalName: string): string {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const randomString = Math.random().toString(36).substring(7);
    const ext = originalName.split('.').pop();
    return `${timestamp}-${randomString}.${ext}`;
  }




}
