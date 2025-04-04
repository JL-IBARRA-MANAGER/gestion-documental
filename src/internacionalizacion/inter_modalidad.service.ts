import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterModalidad } from './inter_modalidad.entity';

@Injectable()
export class InterModalidadService {
  constructor(
    @InjectRepository(InterModalidad)
    private interModalidadRepository: Repository<InterModalidad>,
  ) {}

  async findAll() {
    return this.interModalidadRepository.find();
  }

  async findOneBy(id: number) {
    return this.interModalidadRepository.findOneBy({ MOD_ID: id });
  }

  async create(data: Partial<InterModalidad>) {
    return this.interModalidadRepository.save(data);
  }

  async update(id: number, data: Partial<InterModalidad>) {
    return this.interModalidadRepository.update(id, data);
  }

  async delete(id: number) {
    return this.interModalidadRepository.delete(id);
  }
}
