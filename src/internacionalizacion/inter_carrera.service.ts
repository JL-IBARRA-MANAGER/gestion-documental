import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterCarrera } from './inter_carrera.entity';

@Injectable()
export class InterCarreraService {
  constructor(
    @InjectRepository(InterCarrera)
    private interCarreraRepository: Repository<InterCarrera>,
  ) {}

  async findAll() {
    return this.interCarreraRepository.find();
  }

  async findOneBy(id: number) {
    return this.interCarreraRepository.findOneBy({ ICAR_ID: id });
  }

  async create(data: Partial<InterCarrera>) {
    return this.interCarreraRepository.save(data);
  }

  async update(id: number, data: Partial<InterCarrera>) {
    return this.interCarreraRepository.update(id, data);
  }

  async delete(id: number) {
    return this.interCarreraRepository.delete(id);
  }
}
