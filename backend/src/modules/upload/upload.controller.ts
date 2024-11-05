import type { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';
import { AppError } from '~/errors/app.error';
import Injection from '~/injection/injection';
import UploadService from '~/modules/upload/upload.service';
import UploadStore from '~/modules/upload/upload.store';
import { autoBindClassMethods } from '~/utils/auto-bind-class-methods';

@injectable()
class UploadController {
  constructor(
    @inject(Injection.UploadService) private uploadService: UploadService,
    @inject(Injection.UploadStore) private uploadStore: UploadStore
  ) {
    autoBindClassMethods(this);
  }

  public async getFiles(c: Context) {
    const files = await this.uploadStore.getAllFiles();
    return c.json(files);
  }

  public async getUploadFile(c: Context) {
    const { fileId } = c.req.param();
    const file = await this.uploadStore.getUploadFile(fileId);
    if (!file) throw new AppError('File not found', StatusCodes.NOT_FOUND);
    return c.json(file);
  }

  public async uploadCSV(c: Context) {
    try {
      const body = await c.req.parseBody();
      const csvFile = body['file'] as File;
      const fileRows = await this.uploadService.generateFromCSVFile(csvFile);
      return c.json(fileRows);
    } catch {
      throw new AppError('Failed to process CSV', StatusCodes.BAD_REQUEST);
    }
  }
}

export default UploadController;
