import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdeaEnity } from './idea.entity';
import { IdeaDTO } from './idea.dto';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEnity)
    private readonly ideaRepository: Repository<IdeaEnity>,
  ) {}

  async showAll() {
    return await this.ideaRepository.find();
  }

  async create(data: IdeaDTO) {
    const idea = await this.ideaRepository.create(data);
    await this.ideaRepository.save(idea);
    return idea;
  }

  async read(id: string) {
    let idea;
    try {
      idea = await this.ideaRepository.findOne({ id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    if (!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return idea;
  }

  async update(id: string, data: Partial<IdeaDTO>) {
    await this.read(id);
    await this.ideaRepository.update({ id }, data);
    return this.ideaRepository.findOne({ id });
  }

  async destroy(id: string) {
    const idea = await this.read(id);
    await this.ideaRepository.delete({ id });
    return { ...idea, deleted: true };
  }
}
