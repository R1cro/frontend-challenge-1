import { Hono } from 'hono';
import UploadController from '~/modules/upload/upload.controller';
import { inject, injectable } from 'inversify';
import Injection from '~/injection/injection';

@injectable()
class UploadRouter {
  constructor(@inject(Injection.UploadController) private uploadController: UploadController) {}

  public getRouter(): Hono {
    const router = new Hono();

    router.get('/', this.uploadController.getFiles);
    router.get('/:fileId', this.uploadController.getFiles);
    router.post('/upload', this.uploadController.uploadCSV);

    return router;
  }
}

export default UploadRouter;
