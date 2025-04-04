import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalPersonalService } from './services/global_personal.service';
import { GlobalPersonalController } from './controllers/global_personal.controller';
import { GlobalPersonal } from './entities/global_personal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalPersonal])],
  providers: [GlobalPersonalService],
  controllers: [GlobalPersonalController],
})
export class GlobalPersonalModule {}
