import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalPeriodo } from '../entities/global-periodo.entity';

@Injectable()
export class PeriodosService {
  constructor(
    @InjectRepository(GlobalPeriodo)
    private periodosRepository: Repository<GlobalPeriodo>,
  ) {}

  async findAll(): Promise<any[]> {
    const periodos = await this.periodosRepository.find({
      where: { PER_ESTADO: 1 },
      order: { 
            PER_BANNER: 'DESC', 
            PER_ANO: 'DESC'

      }, 
    });
    
    return periodos.map(periodo => ({
      id: periodo.PER_ID,
      ano: periodo.PER_ANO,
      periodo: periodo.PER_PERIODO + ' - ' + periodo.PER_BANNER, 
      tipo: periodo.PER_TIPO,
    }));
  }
}
