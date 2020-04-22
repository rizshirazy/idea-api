import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from './comment.entity';
import { IdeaEnity } from 'src/idea/idea.entity';
import { UserEntity } from 'src/user/user.entity';
import { CommentDTO } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(IdeaEnity)
    private readonly ideaRepository: Repository<IdeaEnity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private toResponseObject(comment: CommentEntity) {
    const responseObject: any = comment;
    if (comment.author) {
      responseObject.author = comment.author.toResponseObject(false);
    }
    return responseObject;
  }

  async show(id: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    });
    return this.toResponseObject(comment);
  }

  async showByIdea(id: string, page = 1) {
    const comments = await this.commentRepository.find({
      where: { idea: { id } },
      relations: ['author'],
      skip: 25 * (page - 1),
      take: 25,
    });

    return comments.map(comment => this.toResponseObject(comment));
  }

  async showByUser(id: string, page = 1) {
    const comments = await this.commentRepository.find({
      where: { author: { id } },
      relations: ['author'],
      skip: 25 * (page - 1),
      take: 25,
    });

    return comments.map(comment => this.toResponseObject(comment));
  }

  async create(ideaId: string, userId: string, data: CommentDTO) {
    const idea = await this.ideaRepository.findOne({ where: { id: ideaId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const comment = await this.commentRepository.create({
      ...data,
      idea,
      author: user,
    });

    await this.commentRepository.save(comment);
    return this.toResponseObject(comment);
  }

  async destory(id: string, userId: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    });

    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    if (comment.author.id !== userId) {
      throw new HttpException(
        'You do not own this comment',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.commentRepository.remove(comment);
    return this.toResponseObject(comment);
  }
}
