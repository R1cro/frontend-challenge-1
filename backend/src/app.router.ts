import { Hono } from 'hono';
import { injectable, inject } from 'inversify';
import Injection from '~/injection/injection';
import { authMiddleware } from '~/middlewares/auth.middleware';
import AuthRouter from '~/modules/auth/auth.router';
import UploadRouter from '~/modules/upload/upload.router';

@injectable()
export class AppRouter {
  constructor(
    @inject(Injection.AuthRouter) private authRouter: AuthRouter,
    @inject(Injection.UploadRouter) private uploadRouter: UploadRouter
  ) {}

  public getRouter(): Hono {
    const router = new Hono();

    router.route('/auth', this.authRouter.getRouter());
    router.use('/upload/*', authMiddleware);
    router.route('/upload', this.uploadRouter.getRouter());

    return router;
  }
}
