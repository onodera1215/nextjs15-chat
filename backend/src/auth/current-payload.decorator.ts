// src/auth/current-payload.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlContext, JwtPayload } from 'src/types';

export const CurrentPayload = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtPayload | undefined => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<GqlContext>()?.request?.payload;
  },
);
