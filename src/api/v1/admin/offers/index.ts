import schemaValidator from '../../../../middlewares/jsonSchemaValidator';
import authorization from '../../../../middlewares/authorization';

import create from './create';
import update from './update';
import deleteOffer from './delete';
import getOffer from './getOffer';
import getOffers from './getOffers';

import createOfferSchema from '../../schemas/admin/offers/create';
import updateSchema from '../../schemas/admin/offers/update';

const express = require('express');

const offersRouter = express.Router();

offersRouter.post(
  '/',
  authorization(['administrator']),
  schemaValidator(createOfferSchema),
  create
);

offersRouter.put(
  '/:id',
  authorization(['administrator']),
  schemaValidator(updateSchema),
  update
);

offersRouter.delete(
  '/:offerId',
  authorization(['administrator']),
  deleteOffer
);

offersRouter.get(
  '/:offerId',
  authorization(['administrator']),
  getOffer
);

offersRouter.get(
  '/',
  authorization(['administrator']),
  getOffers
);

export default offersRouter;
