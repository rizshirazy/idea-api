import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';

import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private commentSerice: CommentService,
  ) {}

  @Query()
  users(@Args('page') page: number) {
    return this.userService.showAll(page);
  }

  @ResolveProperty()
  comments(@Parent() user) {
    const { id } = user;
    return this.commentSerice.showByUser(id);
  }
}
