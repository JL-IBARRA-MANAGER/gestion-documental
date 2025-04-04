import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterAreaConocimiento } from './inter_area_conocimiento.entity';

@Injectable()
export class InterAreaConocimientoService {
  constructor(
    @InjectRepository(InterAreaConocimiento)
    private interAreaConocimientoRepository: Repository<InterAreaConocimiento>,
  ) {}

  async findAll() {
    return this.interAreaConocimientoRepository.find();
  }

  async findOneBy(id: number) {
    return this.interAreaConocimientoRepository.findOneBy({ ARE_ID: id });
  }

  async create(data: Partial<InterAreaConocimiento>) {
    return this.interAreaConocimientoRepository.save(data);
  }

  async update(id: number, data: Partial<InterAreaConocimiento>) {
    return this.interAreaConocimientoRepository.update(id, data);
  }

  async delete(id: number) {
    return this.interAreaConocimientoRepository.delete(id);
  }
}
