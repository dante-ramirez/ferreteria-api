const AJV = require('ajv');

const ajv = new AJV({ allErrors: true });

// eslint-disable-next-line consistent-return
export default (schema:any) => (req:any, res:any, next:any) => {
  const validate = ajv.compile(schema);

  if (!validate(req.body)) {
    const { errors } = validate;
    return res.status(400).send({
      code: 'VALIDATION_ERROR',
      errors
    });
  }

  next();
};
