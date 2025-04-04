import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterSede } from './inter_sede.entity';

@Injectable()
export class InterSedeService {
  constructor(
    @InjectRepository(InterSede)
    private interSedeRepository: Repository<InterSede>,
  ) {}

  async findAll() {
    return this.interSedeRepository.find();
  }

  async findOneBy(id: number) {
    return this.interSedeRepository.findOneBy({ SEDE_ID: id });
  }

  async create(data: Partial<InterSede>) {
    return this.interSedeRepository.save(data);
  }

  async update(id: number, data: Partial<InterSede>) {
    return this.interSedeRepository.update(id, data);
  }

  async delete(id: number) {
    return this.interSedeRepository.delete(id);
  }
}
