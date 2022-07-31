import schemaValidator from '../../../../middlewares/jsonSchemaValidator';
import authorization from '../../../../middlewares/authorization';

import create from './create';
import deleteFavorite from './delete';
import getFavorites from './getFavorites';

import createFavoriteSchema from '../../schemas/public/favorites/create';

const express = require('express');

const favoritesRouter = express.Router();

favoritesRouter.post(
  '/',
  authorization(['client']),
  schemaValidator(createFavoriteSchema),
  create
);

favoritesRouter.delete(
  '/:favoriteId',
  authorization(['client']),
  deleteFavorite
);

favoritesRouter.get(
  '/',
  authorization(['client']),
  getFavorites
);

export default favoritesRouter;
