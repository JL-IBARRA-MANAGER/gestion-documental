import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Titulacion } from '../entities/biblioteca.entity';
import { Carrera } from '../entities/carrera.entity';
import { ModalidadTitulacion } from '../entities/modalidad_titulacion.entity';
import { GlobalDominios } from '../entities/global_dominios.entity';

@Injectable()
export class BibliotecaService {
  constructor(
    @InjectRepository(Titulacion) private titulacionRepository: Repository<Titulacion>,
    @InjectRepository(Carrera) private carreraRepository: Repository<Carrera>,
    @InjectRepository(ModalidadTitulacion) private modalidadRepository: Repository<ModalidadTitulacion>,
    @InjectRepository(GlobalDominios) private globalDominiosRepository: Repository<GlobalDominios>,
  ) {}

  async findHistoricos() {
    try {
      const dominios = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });
      const historicos = await this.titulacionRepository.query(`
        SELECT 
          "TITU_ID", "TITU_CEDULA", "TITU_NOMBRES", "CAR_NOMBRE", "TITU_FECHA_DEF", "MODT_NOMBRE", "TITU_TITULO", 
          "TITU_SIMILITUD_INF", "TITU_BIBLIOTECA_SENESCYT", "TITU_BIBLIOTECA_PDF", "TITU_BIBLIOTECA_DECLARACION"
        FROM "tbl_titulacion"
        JOIN "tbl_carrera" ON "tbl_titulacion"."CAR_ID" = "tbl_carrera"."CAR_ID"
        JOIN "tbl_modalida_titulacion" ON "tbl_titulacion"."MODT_ID" = "tbl_modalida_titulacion"."MODT_ID"
        WHERE "TITU_BIBLIOTECA" = 0 AND "tbl_titulacion"."MODT_ID" = 3
      `);

      return { historicos, dominio: dominios.GDOM_DOMINIO, descripcion: dominios.GDOM_DESCRIPCION };
    } catch (error) {
      console.error('Error fetching historicos:', error);
      throw new InternalServerErrorException('Error fetching historicos');
    }
  }

  async findPendientes() {
    try {
      const dominios = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });
      const pendientes = await this.titulacionRepository.query(`
        SELECT 
          "TITU_ID", "TITU_CEDULA", "TITU_NOMBRES", "CAR_NOMBRE", "TITU_FECHA_DEF", "MODT_NOMBRE", "TITU_TITULO", 
          "TITU_SIMILITUD_INF", "TITU_BIBLIOTECA_SENESCYT", "TITU_BIBLIOTECA_PDF", "TITU_BIBLIOTECA_DECLARACION"
        FROM "tbl_titulacion"
        JOIN "tbl_carrera" ON "tbl_titulacion"."CAR_ID" = "tbl_carrera"."CAR_ID"
        JOIN "tbl_modalida_titulacion" ON "tbl_titulacion"."MODT_ID" = "tbl_modalida_titulacion"."MODT_ID"
        WHERE "TITU_BIBLIOTECA" = 4
      `);

      return { pendientes, dominio: dominios.GDOM_DOMINIO, descripcion: dominios.GDOM_DESCRIPCION, detalle: "0.- no aplica, 1.- Pendiente cargar, 2.- Rechazado, 3.- Aprobado, 4.- Pendiente revisar por biblioteca"};
    } catch (error) {
      console.error('Error fetching pendientes:', error);
      throw new InternalServerErrorException('Error fetching pendientes');
    }
  }

  async updateRevision(id: number, updateData: Partial<Titulacion>) {
    try {
      console.log(`Updating record with ID: ${id} with data:`, updateData);
      const result = await this.titulacionRepository.createQueryBuilder()
        .update(Titulacion)
        .set(updateData)
        .where('"TITU_ID" = :id', { id })
        .execute();

      console.log('Update result:', result);

      if (result.affected === 0) {
        throw new NotFoundException('Record not found for update');
      }
      const updatedRecord = await this.titulacionRepository.findOne({ where: { TITU_ID: id } });
      if (!updatedRecord) {
        throw new NotFoundException('Updated record not found');
      }
      console.log(`Updated record:`, updatedRecord);
      return updatedRecord;
    } catch (error) {
      console.error('Error updating revision:', error.message);
      throw new InternalServerErrorException('Error updating revision');
    }
  }

  async findRechazados() {
    try {
      const dominios = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });
      const rechazados = await this.titulacionRepository.query(`
        SELECT 
          "TITU_ID", "TITU_CEDULA", "TITU_NOMBRES", "CAR_NOMBRE", "TITU_FECHA_DEF", "MODT_NOMBRE", "TITU_TITULO", 
          "TITU_SIMILITUD_INF", "TITU_BIBLIOTECA_SENESCYT", "TITU_BIBLIOTECA_PDF", "TITU_BIBLIOTECA_DECLARACION", "TITU_BIBLIOTECA_OBSERVACION"
        FROM "tbl_titulacion"
        JOIN "tbl_carrera" ON "tbl_titulacion"."CAR_ID" = "tbl_carrera"."CAR_ID"
        JOIN "tbl_modalida_titulacion" ON "tbl_titulacion"."MODT_ID" = "tbl_modalida_titulacion"."MODT_ID"
        WHERE "TITU_BIBLIOTECA" = 2
      `);

      return { rechazados, dominio: dominios.GDOM_DOMINIO, descripcion: dominios.GDOM_DESCRIPCION };
    } catch (error) {
      console.error('Error fetching rechazados:', error);
      throw new InternalServerErrorException('Error fetching rechazados');
    }
  }

  async findAprobados() {
    try {
      const dominios = await this.globalDominiosRepository.findOne({ where: { GDOM_ID: 1 } });
      const aprobados = await this.titulacionRepository.query(`
        SELECT 
          "TITU_ID", "TITU_CEDULA", "TITU_NOMBRES", "CAR_NOMBRE", "TITU_FECHA_DEF", "MODT_NOMBRE", "TITU_TITULO", 
          "TITU_SIMILITUD_INF", "TITU_BIBLIOTECA_SENESCYT", "TITU_BIBLIOTECA_PDF", "TITU_BIBLIOTECA_DECLARACION"
        FROM "tbl_titulacion"
        JOIN "tbl_carrera" ON "tbl_titulacion"."CAR_ID" = "tbl_carrera"."CAR_ID"
        JOIN "tbl_modalida_titulacion" ON "tbl_titulacion"."MODT_ID" = "tbl_modalida_titulacion"."MODT_ID"
        WHERE "TITU_BIBLIOTECA" = 3
      `);

      return { aprobados, dominio: dominios.GDOM_DOMINIO, descripcion: dominios.GDOM_DESCRIPCION };
    } catch (error) {
      console.error('Error fetching aprobados:', error);
      throw new InternalServerErrorException('Error fetching aprobados');
    }
  }
}
