import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterPais } from './inter_pais.entity';

@Injectable()
export class InterPaisService {
  constructor(
    @InjectRepository(InterPais)
    private interPaisRepository: Repository<InterPais>,
  ) {}

  async findAll() {
    return this.interPaisRepository.find();
  }

  async findOneBy(id: number) {
    return this.interPaisRepository.findOneBy({ PAI_ID: id });
  }

  async create(data: Partial<InterPais>) {
    return this.interPaisRepository.save(data);
  }

  async update(id: number, data: Partial<InterPais>) {
    return this.interPaisRepository.update(id, data);
  }

  async delete(id: number) {
    return this.interPaisRepository.delete(id);
  }
}
