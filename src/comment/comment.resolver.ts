import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CommentService } from './comment.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { CommentDTO } from './comment.dto';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query()
  comment(@Args('id') id: string) {
    return this.commentService.show(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  createComment(
    @Context('user') user,
    @Args('idea') ideaId: string,
    @Args('comment') comment: string,
  ) {
    const { id: userId } = user;
    const data: CommentDTO = { comment };
    return this.commentService.create(ideaId, userId, data);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  deleteComment(@Context('user') user, @Args('id') id: string) {
    const { id: userId } = user;
    console.log({ id, userId });
    return this.commentService.destory(id, userId);
  }
}
