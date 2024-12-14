// import { AuthGuard } from '@nestjs/passport';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {


    const isGraphQl = context.getType()
    if (isGraphQl !== 'http') {
      const gglContext = GqlExecutionContext.create(context).getContext()
      const authHeaders = gglContext.req.headers['authorization']
      const token = this.extractTokenFromHeader(authHeaders);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.SECRET_JWT || 'yourSecretKey'
          }
        );
        return payload
      } catch {
        throw new UnauthorizedException();
      }
      return true;

    } else {
      //REST ENPOINTS
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.SECRET_JWT || 'yourSecretKey'
          }
        );
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }

  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}