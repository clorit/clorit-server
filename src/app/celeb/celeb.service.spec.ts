import { Test, TestingModule } from '@nestjs/testing';
import { CelebService } from './celeb.service';

describe('CelebService', () => {
  let service: CelebService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CelebService],
    }).compile();

    service = module.get<CelebService>(CelebService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
