import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  Delete,
} from '@nestjs/common';

import { CommentService } from './comment.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';
import { CommentDTO } from './comment.dto';

@Controller('api/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  showComments(@Param('id') id: string) {
    return this.commentService.show(id);
  }

  @Get('idea/:id')
  showCommentsByIdea(@Param('id') id: string) {
    return this.commentService.showByIdea(id);
  }

  @Get('user/:id')
  showCommentsByUser(@Param('id') id: string) {
    return this.commentService.showByUser(id);
  }

  @Post('idea/:id')
  @UseGuards(new AuthGuard())
  createComment(
    @User('id') user: string,
    @Param('id') idea: string,
    @Body() data: CommentDTO,
  ) {
    return this.commentService.create(idea, user, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyComment(@User('id') user: string, @Param('id') id: string) {
    return this.commentService.destory(id, user);
  }
}
