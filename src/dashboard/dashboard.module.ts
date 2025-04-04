import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';
import { Carrera } from '../biblioteca/entities/carrera.entity';
import { MatrizGraduados } from '../administracion/entities/matriz_graduados.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrera, MatrizGraduados])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
