import AJV from 'ajv';
import fs from '../helpers/file';

const ajv = new AJV({ allErrors: true });

type schemaType = 'json' | 'form-data';

// eslint-disable-next-line consistent-return
export default (schema: any, type: schemaType = 'json') => (req: any, res: any, next: any) => {
  const validate = ajv.compile(schema);

  if (type === 'json') {
    if (!validate(req.body)) {
      const { errors } = validate;
      return res.status(400).send({
        code: 'VALIDATION_ERROR',
        errors
      });
    }
  } else if (type === 'form-data') {
    const { body, file, files } = req;

    const data = {
      body,
      file,
      files
    };

    if (!validate(data)) {
      const { errors } = validate;

      if (file) {
        fs.delete('uploads/invoices/', file.filename);
      } else if (files) {
        for (let index = 0; index < files.length; index += 1) {
          fs.delete('uploads/products/', files[index].filename);
        }
      }

      return res.status(400).send({
        code: 'VALIDATION_ERROR',
        errors
      });
    }
  }

  next();
};
