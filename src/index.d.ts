// eslint-disable-next-line @typescript-eslint/no-unused-var
import type * as express from 'express';
import type { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
