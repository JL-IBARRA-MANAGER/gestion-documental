import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterTipoParticipante } from './inter_tipo_participante.entity';

@Injectable()
export class InterTipoParticipanteService {
  constructor(
    @InjectRepository(InterTipoParticipante)
    private interTipoParticipanteRepository: Repository<InterTipoParticipante>,
  ) {}

  async findAll() {
    return this.interTipoParticipanteRepository.find();
  }

  async findOneBy(id: number) {
    return this.interTipoParticipanteRepository.findOneBy({ PTIP_ID: id });
  }

  async create(data: Partial<InterTipoParticipante>) {
    return this.interTipoParticipanteRepository.save(data);
  }

  async update(id: number, data: Partial<InterTipoParticipante>) {
    return this.interTipoParticipanteRepository.update(id, data);
  }

  async delete(id: number) {
    return this.interTipoParticipanteRepository.delete(id);
  }
}
