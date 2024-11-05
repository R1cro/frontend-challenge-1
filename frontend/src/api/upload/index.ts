import { API } from '~/api';
import { TICFile } from '~/interfaces/upload';

class UploadAPI {
  static async getCSVs() {
    const response = await API.get('/files');
    return response.data as TICFile[];
  }

  static async getCSV(id: string) {
    const response = await API.get(`/files/${id}`);
    return response.data as TICFile;
  }

  static async uploadCSVFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await API.post('/files/upload', formData);
    return response.data as TICFile[];
  }
}

export default UploadAPI;
