import { Test, TestingModule } from '@nestjs/testing';
import { InternacionalizacionService } from './internacionalizacion.service';

describe('InternacionalizacionService', () => {
  let service: InternacionalizacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternacionalizacionService],
    }).compile();

    service = module.get<InternacionalizacionService>(InternacionalizacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
