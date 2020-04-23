import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request) {
      if (!request.headers.authorization) {
        return false;
      }

      request.user = await this.validateToken(request.headers.authorization);
      return true;
    } else {
      const ctx: any = GqlExecutionContext.create(context).getContext();
      if (!ctx.headers.authorization) {
        return false;
      }

      ctx.user = await this.validateToken(ctx.headers.authorization);
      return true;
    }
  }

  async validateToken(auth: string) {
    const authArr = auth.split(' ');
    if (authArr[0] !== 'Bearer' || !authArr[1]) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    const token = authArr[1];

    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
      const message = `Token error: ${error.message || error.name}`;
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
