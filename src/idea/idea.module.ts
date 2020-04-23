import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { IdeaEnity } from './idea.entity';
import { UserEntity } from 'src/user/user.entity';
import { IdeaResolver } from './idea.resolver';
import { CommentService } from 'src/comment/comment.service';
import { CommentEntity } from 'src/comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEnity, UserEntity, CommentEntity])],
  controllers: [IdeaController],
  providers: [IdeaService, IdeaResolver, CommentService],
})
export class IdeaModule {}
