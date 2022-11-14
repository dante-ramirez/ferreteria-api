import schemaValidator from '../../../../middleware/jsonSchemaValidator';
import authorization from '../../../../middleware/authorization';

import create from './create';
import update from './update';
import deleteBrand from './delete';
import getIndividualOffer from './getIndividualOffer';
import getIndividualOffers from './getIndividualOffers';
import verifyOffers from './verifyOffers';

import createIndividualOfferSchema from '../../schemas/admin/individualOffers/create';
import updateSchema from '../../schemas/admin/individualOffers/update';

const express = require('express');

const individualOffersRouter = express.Router();

individualOffersRouter.post(
  '/',
  authorization(['administrator']),
  schemaValidator(createIndividualOfferSchema),
  create
);

individualOffersRouter.put(
  '/:id',
  authorization(['administrator']),
  schemaValidator(updateSchema),
  update
);

individualOffersRouter.delete(
  '/:individualOfferId',
  authorization(['administrator']),
  deleteBrand
);

individualOffersRouter.get(
  '/:individualOfferId',
  authorization(['administrator']),
  getIndividualOffer
);

individualOffersRouter.get(
  '/',
  authorization(['administrator']),
  getIndividualOffers
);

individualOffersRouter.put(
  '/offers/verified',
  verifyOffers
);

export default individualOffersRouter;
