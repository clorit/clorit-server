import { Test, TestingModule } from '@nestjs/testing';
import { CelebController } from './celeb.controller';

describe('CelebController', () => {
  let controller: CelebController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CelebController],
    }).compile();

    controller = module.get<CelebController>(CelebController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
