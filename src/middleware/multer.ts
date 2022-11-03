import path from 'path';
import formatDate from '../helpers/formatDate';

const multer = require('multer');

const invoiceStorage = multer.diskStorage({
  destination: path.join(__dirname, '../api/v1/uploads/invoices'),
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${formatDate.filesName(new Date())}_${file.fieldname}_${file.originalname}`);
  }
});
const uploadInvoice = multer({ storage: invoiceStorage });

const productStorage = multer.diskStorage({
  destination: path.join(__dirname, '../api/v1/uploads/products'),
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${formatDate.filesName(new Date())}_${file.fieldname}_${req.body.name}_${file.originalname}`);
  }
});
const uploadProduct = multer({ storage: productStorage });

class Multer {
  uploadInvoice = (req: any, res: any, next: any) => {
    const uploadFile = uploadInvoice.single('invoice');

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

  uploadProduct = (req: any, res: any, next: any) => {
    const uploadFile = uploadProduct.array('products', 4);

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
