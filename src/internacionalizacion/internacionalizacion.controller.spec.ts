import { Test, TestingModule } from '@nestjs/testing';
import { InternacionalizacionController } from './internacionalizacion.controller';

describe('InternacionalizacionController', () => {
  let controller: InternacionalizacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternacionalizacionController],
    }).compile();

    controller = module.get<InternacionalizacionController>(InternacionalizacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
