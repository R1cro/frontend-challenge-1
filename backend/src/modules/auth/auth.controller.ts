import { setCookie, getCookie } from 'hono/cookie';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';

import { ValidateDTO } from '~/decorators/validate-dto.decorator';
import { AppError } from '~/errors/app.error';
import Injection from '~/injection/injection';
import AuthService from '~/modules/auth/auth.service';
import { AuthDTO } from '~/modules/auth/dto/auth.dto';
import { autoBindClassMethods } from '~/utils/auto-bind-class-methods';

import type { Context } from 'hono';

@injectable()
class AuthController {
  constructor(@inject(Injection.AuthService) private authService: AuthService) {
    autoBindClassMethods(this);
  }

  @ValidateDTO(AuthDTO)
  public async signIn(c: Context) {
    const currentSessionId = getCookie(c, 'session') ?? '';
    if (this.authService.isSessionActive(currentSessionId)) {
      throw new AppError('Session already active', StatusCodes.BAD_REQUEST);
    }

    const body = (await c.req.json()) as AuthDTO;
    const sessionId = this.authService.signIn(body.username, body.password);
    if (!sessionId) throw new AppError('Invalid credentials', StatusCodes.UNAUTHORIZED);

    setCookie(c, 'session', sessionId, {
      httpOnly: true,
      sameSite: 'Strict',
      path: '/',
      maxAge: 3600
    });

    return c.text('Login successful');
  }

  public signOut(c: Context) {
    const sessionId = getCookie(c, 'session');
    if (!sessionId) throw new AppError('No active session found', StatusCodes.UNAUTHORIZED);

    this.authService.signOut(sessionId);
    setCookie(c, 'session', '', { maxAge: 0 });
    return c.text('Logout successful');
  }
}

export default AuthController;
