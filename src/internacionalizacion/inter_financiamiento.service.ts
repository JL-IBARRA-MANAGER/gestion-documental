import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterFinanciamiento } from './inter_financiamiento.entity';

@Injectable()
export class InterFinanciamientoService {
  constructor(
    @InjectRepository(InterFinanciamiento)
    private interFinanciamientoRepository: Repository<InterFinanciamiento>,
  ) {}

  async findAll() {
    return this.interFinanciamientoRepository.find();
  }

  async findOneBy(id: number) {
    return this.interFinanciamientoRepository.findOneBy({ FIN_ID: id });
  }

  async create(data: Partial<InterFinanciamiento>) {
    return this.interFinanciamientoRepository.save(data);
  }

  async update(id: number, data: Partial<InterFinanciamiento>) {
    return this.interFinanciamientoRepository.update(id, data);
  }

  async delete(id: number) {
    return this.interFinanciamientoRepository.delete(id);
  }
}
