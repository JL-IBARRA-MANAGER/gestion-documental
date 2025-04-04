import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalEstudiantesService } from './services/global_estudiantes.service';
import { GlobalEstudiantesController } from './controllers/global_estudiantes.controller';
import { GlobalEstudiantes } from './entities/global_estudiantes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalEstudiantes])],
  providers: [GlobalEstudiantesService],
  controllers: [GlobalEstudiantesController],
})
export class GlobalEstudiantesModule {}
