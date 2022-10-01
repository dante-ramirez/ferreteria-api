import schemaValidator from '../../../../middleware/jsonSchemaValidator';
import authorization from '../../../../middleware/authorization';

import create from './create';
import update from './update';
import deleteSurvey from './delete';
import getSurvey from './getSurvey';
import getSurveys from './getSurveys';

import createSurveySchema from '../../schemas/admin/surveys/create';
import updateSchema from '../../schemas/admin/surveys/update';

const express = require('express');

const surveysRouter = express.Router();

surveysRouter.post(
  '/',
  authorization(['administrator']),
  schemaValidator(createSurveySchema),
  create
);

surveysRouter.put(
  '/:id',
  authorization(['administrator']),
  schemaValidator(updateSchema),
  update
);

surveysRouter.delete(
  '/:surveyId',
  authorization(['administrator']),
  deleteSurvey
);

surveysRouter.get(
  '/:surveyId',
  authorization(['administrator']),
  getSurvey
);

surveysRouter.get(
  '/',
  authorization(['administrator']),
  getSurveys
);

export default surveysRouter;
