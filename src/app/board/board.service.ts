import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from 'src/type/board/create-board.dto';
import { Repository } from 'typeorm';
import { CelebService } from '../celeb/celeb.service';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @Inject(forwardRef(() => CelebService))
    private readonly celebService: CelebService,
  ) {}

  async create(boardDto: CreateBoardDto): Promise<Board> {
    const { celebName, ...partBoardDto } = boardDto;

    const celeb = await this.celebService.getByName(celebName);
    const saveBoardDto = { celeb: celeb, ...partBoardDto };
    console.log(saveBoardDto);
    const boardtoSave = await this.boardRepository.create(saveBoardDto);
    console.log(boardtoSave);
    return await this.boardRepository.save(boardtoSave);
  }

  async read(id: number): Promise<Board> {
    return await this.boardRepository.findOne(id);
  }

  async destroy(id: number): Promise<Board> {
    const boardToDestroy = await this.boardRepository.findOne(id);
    return await this.boardRepository.remove(boardToDestroy);
  }
}
