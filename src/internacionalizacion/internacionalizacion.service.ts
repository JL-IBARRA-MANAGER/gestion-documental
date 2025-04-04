import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Internacionalizacion } from './internacionalizacion.entity';
import { CreateInternacionalizacionDto } from './dtos/create_internacionalizacion.dto';

@Injectable()
export class InternacionalizacionService {
  constructor(
    @InjectRepository(Internacionalizacion)
    private internacionalizacionRepository: Repository<Internacionalizacion>,
  ) {}

  async findAll() {
    try {
      const result = await this.internacionalizacionRepository.createQueryBuilder('internacionalizacion')
        .leftJoinAndSelect('internacionalizacion.sede', 'sede')
        .select([
          'internacionalizacion.INTER_ID',
          'sede.SEDE_NOMBRE',
          'internacionalizacion.ICAR_ID',
          'internacionalizacion.INTER_CONV_CODIGO',
          'internacionalizacion.INTER_CONV_NOMBRE',
          'internacionalizacion.INTER_CONTRAPARTE',
          'internacionalizacion.PAI_ID',
          'internacionalizacion.PTIP_ID',
          'internacionalizacion.INTER_PAPELLIDO',
          'internacionalizacion.INTER_PNOMBRE',
          'internacionalizacion.INTER_ACTIVIDADES',
          'internacionalizacion.INTER_FINICIO',
          'internacionalizacion.INTER_FFIN',
          'internacionalizacion.ARE_ID',
          'internacionalizacion.FIN_ID',
          'internacionalizacion.INTER_ADOCENCIA',
          'internacionalizacion.INTER_AINVESTIGACION',
          'internacionalizacion.INTER_AVINCULACION',
          'internacionalizacion.INTER_AADMINISTRATIVO',
          'internacionalizacion.INTER_AINTERNACIONALIZACION',
          'internacionalizacion.INTER_INDICADOR_1',
          'internacionalizacion.INTER_INDICADOR_2',
          'internacionalizacion.INTER_INDICADOR_3',
          'internacionalizacion.INTER_INDICADOR_4',
          'internacionalizacion.INTER_INDICADOR_5',
          'internacionalizacion.INTER_INDICADOR_6',
          'internacionalizacion.INTER_INDICADOR_7',
          'internacionalizacion.INTER_INDICADOR_8',
          'internacionalizacion.INTER_INDICADOR_9',
          'internacionalizacion.INTER_EVIDENCIA'
        ])
        .getMany();
      return result;
    } catch (error) {
      console.error('Error fetching internationalization records:', error);
      throw new Error('Internal server error');
    }
  }

  async findByInterId(interId: number) {
    try {
      const id = parseInt(interId.toString(), 10);
      if (isNaN(id)) {
        throw new Error('Invalid ID');
      }
      const result = await this.internacionalizacionRepository.createQueryBuilder('internacionalizacion')
        .leftJoinAndSelect('internacionalizacion.sede', 'sede')
        .select([
          'internacionalizacion.INTER_ID',
          'sede.SEDE_ID',
          'sede.SEDE_NOMBRE',
          'internacionalizacion.ICAR_ID',
          'internacionalizacion.INTER_CONV_CODIGO',
          'internacionalizacion.INTER_CONV_NOMBRE',
          'internacionalizacion.INTER_CONTRAPARTE',
          'internacionalizacion.PAI_ID',
          'internacionalizacion.PTIP_ID',
          'internacionalizacion.INTER_PAPELLIDO',
          'internacionalizacion.INTER_PNOMBRE',
          'internacionalizacion.INTER_ACTIVIDADES',
          'internacionalizacion.INTER_FINICIO',
          'internacionalizacion.INTER_FFIN',
          'internacionalizacion.ARE_ID',
          'internacionalizacion.FIN_ID',
          'internacionalizacion.INTER_ADOCENCIA',
          'internacionalizacion.INTER_AINVESTIGACION',
          'internacionalizacion.INTER_AVINCULACION',
          'internacionalizacion.INTER_AADMINISTRATIVO',
          'internacionalizacion.INTER_AINTERNACIONALIZACION',
          'internacionalizacion.INTER_INDICADOR_1',
          'internacionalizacion.INTER_INDICADOR_2',
          'internacionalizacion.INTER_INDICADOR_3',
          'internacionalizacion.INTER_INDICADOR_4',
          'internacionalizacion.INTER_INDICADOR_5',
          'internacionalizacion.INTER_INDICADOR_6',
          'internacionalizacion.INTER_INDICADOR_7',
          'internacionalizacion.INTER_INDICADOR_8',
          'internacionalizacion.INTER_INDICADOR_9',
          'internacionalizacion.INTER_EVIDENCIA'
        ])
        .where('internacionalizacion.INTER_ID = :id', { id })
        .getOne();
      return result;
    } catch (error) {
      console.error('Error fetching internationalization record by ID:', error);
      throw new Error('Internal server error');
    }
  }

  async create(createData: CreateInternacionalizacionDto) {
    try {
      const internacionalizacion = this.internacionalizacionRepository.create(createData);
      const result = await this.internacionalizacionRepository.save(internacionalizacion);
      return result;
    } catch (error) {
      console.error('Error creating internationalization record:', error);
      throw new Error('Internal server error');
    }
  }

  async update(interId: number, updateData: Partial<Internacionalizacion>) {
    try {
      const id = parseInt(interId.toString(), 10);
      if (isNaN(id)) {
        throw new Error('Invalid ID');
      }
      const result = await this.internacionalizacionRepository.update(id, updateData);
      return result;
    } catch (error) {
      console.error('Error updating internationalization record:', error);
      throw new Error('Internal server error');
    }
  }
}
