import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { IdeaEnity } from 'src/idea/idea.entity';
import { UserEntity } from 'src/user/user.entity';
import { CommentEntity } from './comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEnity, UserEntity, CommentEntity])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
