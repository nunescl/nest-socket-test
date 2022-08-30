import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';
import { Socket } from 'socket.io';
import { User } from './user.entity';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const req = ctx.switchToWs().getClient<Socket>();

  return req.handshake.auth;
});
