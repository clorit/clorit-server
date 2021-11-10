import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from 'src/type/board/create-board.dto';
import { Repository } from 'typeorm';
import { CelebService } from '../celeb/celeb.service';
import { UserService } from '../user/user.service';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @Inject(forwardRef(() => CelebService))
    private readonly celebService: CelebService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(boardDto: CreateBoardDto): Promise<Board> {
    const { celebName, userId, ...partBoardDto } = boardDto;

    const celeb = await this.celebService.getByName(celebName);
    await this.celebService.countUp(celeb.id);
    const user = await this.userService.getById(userId);

    const saveBoardDto = { celeb: celeb, user: user, ...partBoardDto };
    const boardtoSave = await this.boardRepository.create(saveBoardDto);

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
