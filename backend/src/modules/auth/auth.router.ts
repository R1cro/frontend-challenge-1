import { Hono } from 'hono';
import { inject, injectable } from 'inversify';

import Injection from '~/injection/injection';
import AuthController from '~/modules/auth/auth.controller';

@injectable()
class AuthRouter {
  constructor(@inject(Injection.AuthController) private authController: AuthController) {}

  public getRouter(): Hono {
    const router = new Hono();

    router.post('/sign-in', this.authController.signIn);
    router.post('/sign-out', this.authController.signOut);

    return router;
  }
}

export default AuthRouter;
