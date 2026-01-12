import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticatedRequest } from 'src/types';

export const CurrentPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const authenticatedRequest = ctx?.getContext<{
      req: AuthenticatedRequest;
    }>();
    return authenticatedRequest?.req?.payload;
  },
);
