import { makeAutoObservable } from 'mobx';
import { TICFile } from '~/interfaces/upload';
import UploadAPI from '~/api/upload';

class UploadStore {
  csvFiles: TICFile[] = [];
  isFilesLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchFiles = async () => {
    this.setIsLoading(true);
    try {
      const files = await UploadAPI.getCSVs();
      this.setUploadedFiles(files);
    } finally {
      this.setIsLoading(false);
    }
  };

  uploadCSVFile = async (file: File) => {
    const newUploadedTICFiles = await UploadAPI.uploadCSVFile(file);
    this.setUploadedFiles([...this.TICFiles, ...newUploadedTICFiles]);
  };

  get TICFiles() {
    return this.csvFiles;
  }

  get isLoading() {
    return this.isFilesLoading;
  }

  private setIsLoading = (isLoading: boolean) => {
    this.isFilesLoading = isLoading;
  };

  private setUploadedFiles = (files: TICFile[]) => {
    this.csvFiles = files;
  };
}

const uploadStore = new UploadStore();
export const useUploadStore = () => uploadStore;
export default uploadStore;
