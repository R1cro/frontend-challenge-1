import fs from 'node:fs/promises';
import path from 'node:path';
import * as process from 'node:process';
import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { UploadTICFile, TICFile } from './types';
import { API_URL } from '~/constants/urls';

@injectable()
class UploadStore {
  private readonly STORE_FOLDER_PATH = path.resolve(process.cwd(), 'dist');

  constructor() {
    void fs.mkdir(this.STORE_FOLDER_PATH, { recursive: true });
  }

  public async getAllFiles(): Promise<UploadTICFile[]> {
    const files = await fs.readdir(this.STORE_FOLDER_PATH);
    const filesPromises = files.map((file) => this.getUploadFile(path.basename(file, '.json')));
    return await Promise.all(filesPromises).then((files) => files.filter((file) => file !== null) as UploadTICFile[]);
  }

  public async saveFileToMFR(mrf: TICFile): Promise<UploadTICFile> {
    const storeId = uuidv4();
    const storeMRF: UploadTICFile = {
      id: storeId,
      url: `${API_URL}/dist/${storeId}.json`,
      data: mrf
    };
    const fileName = `${storeMRF.id}.json`;
    await fs.writeFile(path.resolve(this.STORE_FOLDER_PATH, fileName), JSON.stringify(storeMRF));
    return storeMRF;
  }

  public async getUploadFile(id: string): Promise<UploadTICFile | null> {
    if (!(await this.isUploadFileExists(id))) return null;
    const data = await fs.readFile(path.resolve(this.STORE_FOLDER_PATH, `${id}.json`), 'utf-8');
    return JSON.parse(data) as UploadTICFile;
  }

  public async isUploadFileExists(id: string): Promise<boolean> {
    try {
      await fs.access(path.resolve(this.STORE_FOLDER_PATH, `${id}.json`));
      return true;
    } catch {
      return false;
    }
  }
}

export default UploadStore;
