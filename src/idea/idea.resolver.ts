import {
  Resolver,
  Query,
  Args,
  Parent,
  ResolveProperty,
} from '@nestjs/graphql';

import { IdeaService } from './idea.service';
import { CommentService } from 'src/comment/comment.service';

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

  @ResolveProperty()
  comments(@Parent() idea) {
    const { id } = idea;
    return this.commentService.showByIdea(id);
  }
}
