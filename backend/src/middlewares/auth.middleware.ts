import { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { StatusCodes } from 'http-status-codes';

import Injection from '~/injection/injection';
import InjectionContainer from '~/injection/injection-container';
import AuthService from '~/modules/auth/auth.service';

export const authMiddleware = async (c: Context, next: Next) => {
  const authService = InjectionContainer.get<AuthService>(Injection.AuthService);
  const sessionId = getCookie(c, 'session');

  if (sessionId && authService.isSessionActive(sessionId)) {
    await next();
  } else {
    return c.text('Unauthorized', StatusCodes.UNAUTHORIZED);
  }
};
