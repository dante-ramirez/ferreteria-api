import schemaValidator from '../../../../middlewares/jsonSchemaValidator';
import authorization from '../../../../middlewares/authorization';

import createUser from './create';
import update from './update';
// import updatePassword from './updatePassword';
// import restorePassword from './restorePassword';
// import verifyAccount from './verifyAccount';
// import sendAccountVerificationEmail from './sendAccountVerificationEmail';
// import me from './me';
// import createCard from './createCard';
// import getCards from './getCards';
// import deleteCard from './deleteCard';

import createUserSchema from '../../schemas/public/users/create';
import updateSchema from '../../schemas/public/users/update';
// import updatePasswordSchema from '../../schemas/public/users/updatePassword';

const express = require('express');

const usersRouter = express.Router();

usersRouter.post(
  '/',
  schemaValidator(createUserSchema),
  createUser
);

// usersRouter.post(
//   '/:userEmail/password',
//   restorePassword
// );

// usersRouter.put(
//   '/password',
//   authorization(['client']),
//   schemaValidator(updatePasswordSchema),
//   updatePassword
// );

usersRouter.put(
  '/',
  authorization(['client']),
  schemaValidator(updateSchema),
  update
);

// usersRouter.get(
//   '/account/verified',
//   verifyAccount
// );

// usersRouter.post(
//   '/account/verification-email',
//   authorization(['client']),
//   sendAccountVerificationEmail
// );

// usersRouter.get(
//   '/me',
//   authorization(['client']),
//   me
// );

// usersRouter.post(
//   '/card',
//   authorization(['client']),
//   createCard
// );

// usersRouter.get(
//   '/cards',
//   authorization(['client']),
//   getCards
// );

// usersRouter.delete(
//   '/card/:mercadoPagoId',
//   authorization(['client']),
//   deleteCard
// );

export default usersRouter;
