import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodosService } from './services/periodos.service';
import { PeriodosController } from './controllers/periodos.controller';
import { GlobalPeriodo } from './entities/global-periodo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalPeriodo])],
  controllers: [PeriodosController],
  providers: [PeriodosService],
})
export class PeriodosModule {}
