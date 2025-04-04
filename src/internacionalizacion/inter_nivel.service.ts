import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterNivel } from './inter_nivel.entity';

@Injectable()
export class InterNivelService {
  constructor(
    @InjectRepository(InterNivel)
    private interNivelRepository: Repository<InterNivel>,
  ) {}

  async findAll() {
    return this.interNivelRepository.find();
  }

  async findOneBy(id: number) {
    return this.interNivelRepository.findOneBy({ NIV_ID: id });
  }

  async create(data: Partial<InterNivel>) {
    return this.interNivelRepository.save(data);
  }

  async update(id: number, data: Partial<InterNivel>) {
    return this.interNivelRepository.update(id, data);
  }

  async delete(id: number) {
    return this.interNivelRepository.delete(id);
  }
}
