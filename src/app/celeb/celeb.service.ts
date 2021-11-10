import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCelebDto } from 'src/type/celeb/create-celeb.dto';
import { Repository } from 'typeorm';
import { runInThisContext } from 'vm';
import { Celeb } from './celeb.entity';

@Injectable()
export class CelebService {
  constructor(
    @InjectRepository(Celeb)
    private readonly celebRepository: Repository<Celeb>,
  ) {}

  async create(celebDto: CreateCelebDto): Promise<Celeb> {
    const { name } = celebDto;

    const celeb = new Celeb();
    celeb.name = name;
    celeb.count = 0;

    return await this.celebRepository.save(celeb);
  }

  async read(name: string): Promise<Celeb> {
    return await this.celebRepository.findOne({ name: name });
  }

  async destroy(name: string): Promise<Celeb> {
    const celebToDestroy = await this.celebRepository.findOne({ name: name });
    return await this.celebRepository.remove(celebToDestroy);
  }

  async countUp(id: number): Promise<Celeb> {
    const updatedCeleb = await this.celebRepository.findOne(id);
    updatedCeleb.count += 1;
    return await this.celebRepository.save(updatedCeleb);
  }

  async getByName(name: string): Promise<Celeb> {
    return await this.celebRepository.findOne({ name: name });
  }
}
