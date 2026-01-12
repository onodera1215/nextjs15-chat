// src/types/graphql-context.ts
import type { Request } from 'express';

export type JwtPayload = {
  id?: string;
  sub?: string;
  email?: string;
  name?: string;
  roles?: string[];
};

export type AuthenticatedRequest = Request & { payload?: JwtPayload };
export type GqlContext = { request: AuthenticatedRequest };
