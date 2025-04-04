import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterAreaconEspecifico } from './inter_areacon_especifico.entity';

@Injectable()
export class InterAreaconEspecificoService {
  constructor(
    @InjectRepository(InterAreaconEspecifico)
    private interAreaconEspecificoRepository: Repository<InterAreaconEspecifico>,
  ) {}

  async findAll() {
    return this.interAreaconEspecificoRepository.find();
  }

  async findOneBy(id: number) {
    return this.interAreaconEspecificoRepository.findOneBy({ AESP_ID: id });
  }

  async create(data: Partial<InterAreaconEspecifico>) {
    return this.interAreaconEspecificoRepository.save(data);
  }

  async update(id: number, data: Partial<InterAreaconEspecifico>) {
    return this.interAreaconEspecificoRepository.update(id, data);
  }

  async delete(id: number) {
    return this.interAreaconEspecificoRepository.delete(id);
  }
}
