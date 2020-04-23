import {
  Resolver,
  Query,
  Args,
  Parent,
  Mutation,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';
import { UserDTO } from './user.dto';
import { AuthGuard } from 'src/shared/auth.guard';

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

  @Query()
  user(@Args('username') username: string) {
    return this.userService.read(username);
  }

  @Query()
  @UseGuards(new AuthGuard())
  whoami(@Context('user') user) {
    const { username } = user;
    return this.userService.read(username);
  }

  @Mutation()
  login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user: UserDTO = { username, password };
    return this.userService.login(user);
  }

  @Mutation()
  register(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user: UserDTO = { username, password };
    return this.userService.register(user);
  }

  @ResolveField()
  comments(@Parent() user) {
    const { id } = user;
    return this.commentSerice.showByUser(id);
  }
}
