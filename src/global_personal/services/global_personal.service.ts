import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalPersonal } from '../entities/global_personal.entity';

@Injectable()
export class GlobalPersonalService {
  constructor(
    @InjectRepository(GlobalPersonal)
    private globalPersonalRepository: Repository<GlobalPersonal>,
  ) {}

  async findAll() {
    try {
      return await this.globalPersonalRepository.find({
        select: ["LDOC_NOMBRE", "LDOC_CEDULA"]
      });
    } catch (error) {
      console.error('Error fetching global personal records:', error);
      throw new Error('Internal server error');
    }
  }
}
