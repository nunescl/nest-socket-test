import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { AuthService } from './auth/auth.service';

@Injectable()
export class JwtWsAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const client = ctx.switchToWs().getClient<Socket>();
    const { authorization } = client.handshake.auth;

    if (!authorization) {
      throw new ForbiddenException();
    }

    const decodedToken = this.jwtService.decode(authorization);

    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.authService.getUsername(decodedToken['username']);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return true;
  }
}
