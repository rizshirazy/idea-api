import { Controller, Post, Get, Logger, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller()
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get('api/users')
  fetchAllUsers() {
    return this.userService.showAll();
  }

  @Post('/login')
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('/register')
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }
}
