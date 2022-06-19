import config from '../../configuration';
import { userRole as _userRole } from '../entities/User';

const jwt = require('jsonwebtoken');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });
const jwtSchema = {
  type: 'object',
  required: ['exp', 'id', 'email', 'role'],
  properties: {
    id: {
      type: 'number',
      minimum: 0
    },
    email: {
      type: 'string',
      format: 'email'
    },
    role: {
      type: 'string',
      enum: ['administrator', 'client']
    },
    exp: { type: 'number' }
  }
};

const validate = ajv.compile(jwtSchema);

const jwtAuthentication = (rolesAllowed: _userRole[]) => (req: any, res: any, next: any) => {
  const { authorization } = req.headers || {};

  if (!authorization) {
    return res.status(401).send({ code: 'UNAUTHORIZED' });
  }

  const [tokenType, jwToken] = authorization.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(401).send({ code: 'EXPECTED_BEARER_TOKEN' });
  }

  let decodedToken = { id: 0, email: '', role: '' };

  try {
    decodedToken = jwt.verify(jwToken, config.jwt.secret, { algorithms: [config.jwt.algorithm] });
  } catch (error) {
    if ((error as any).message === 'jwt expired') {
      return res.status(401).send({ code: 'JWT_EXPIRED' });
    }

    return res.status(400).send({ error, code: 'BAD_JWT_TOKEN' });
  }

  if (!validate(decodedToken)) {
    const { errors } = validate;

    return res.status(400).send({ error: errors, code: 'BAD_JWT_TOKEN' });
  }

  if (!rolesAllowed.includes((decodedToken.role as any))) {
    return res.status(401).send({ code: 'UNAUTHORIZED' });
  }

  req.user = {
    id: Number(decodedToken.id),
    email: decodedToken.email,
    role: decodedToken.role
  };

  return next();
};

export default jwtAuthentication;
