import {
  Resolver,
  Query,
  Args,
  Parent,
  ResolveField,
  Mutation,
  Context,
} from '@nestjs/graphql';

import { IdeaService } from './idea.service';
import { CommentService } from 'src/comment/comment.service';
import { IdeaDTO } from './idea.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';

@Resolver()
export class IdeaResolver {
  constructor(
    private readonly ideaService: IdeaService,
    private readonly commentService: CommentService,
  ) {}

  @Query()
  ideas(@Args('page') page?: number, @Args('newest') newest?: boolean) {
    return this.ideaService.showAll(page, newest);
  }

  @Query()
  idea(@Args('id') id: string) {
    return this.ideaService.read(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  createIdea(
    @Context('user') user,
    @Args('idea') idea: string,
    @Args('description') description: string,
  ) {
    const { id: userId } = user;
    const data: IdeaDTO = { idea, description };
    return this.ideaService.create(userId, data);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  updateIdea(
    @Context('user') user,
    @Args('id') id: string,
    @Args('idea') idea: string,
    @Args('description') description: string,
  ) {
    const { id: userId } = user;
    const data: IdeaDTO = { idea, description };
    return this.ideaService.update(id, data, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  deleteIdea(@Context('user') user, @Args('id') id: string) {
    const { id: userId } = user;
    return this.ideaService.destroy(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  upvote(@Context('user') user, @Args('id') id: string) {
    const { id: userId } = user;
    return this.ideaService.upvote(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  downvote(@Context('user') user, @Args('id') id: string) {
    const { id: userId } = user;
    return this.ideaService.downvote(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  bookmark(@Context('user') user, @Args('id') id: string) {
    const { id: userId } = user;
    return this.ideaService.bookmark(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  unbookmark(@Context('user') user, @Args('id') id: string) {
    const { id: userId } = user;
    return this.ideaService.bookmark(id, userId);
  }

  @ResolveField()
  comments(@Parent() idea) {
    const { id } = idea;
    return this.commentService.showByIdea(id);
  }
}
