import path from 'path';
import formatDate from '../helpers/formatDate';

const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../api/v1/uploads/invoices'),
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${formatDate.filesName(new Date())}_${file.fieldname}_${file.originalname}`);
  }
});

const upload = multer({ storage });

class Multer {
  uploadInvoice = (req: any, res: any, next: any) => {
    const uploadFile = upload.single('invoice');

    uploadFile(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        res.end(JSON.stringify({ statusText: 'MULTER_ERROR', message: err }));
        next(err);
      } else if (err) {
        res.end(JSON.stringify({ statusText: 'UNEXPECTED_ERROR', message: err }));
        next(err);
      }

      next();
    });
  };
}

export default new Multer();
