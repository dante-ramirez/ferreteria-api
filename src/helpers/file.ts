import fs from 'fs';
import _path from 'path';
import logger from './logger';

class File {
  delete(path: string, fileName: string) {
    try {
      fs.unlinkSync(_path.join(__dirname, `../api/v1/${path}`, fileName));

      return JSON.parse(JSON.stringify({
        status: 200,
        statusText: 'Success',
        message: `File with name '${fileName}' deleted successfully`
      }));
    } catch (error: any) {
      logger.log(error);
      return JSON.parse(JSON.stringify({ status: 400, statusText: 'FS_ERROR', message: error }));
    }
  }
}

export default new File();
