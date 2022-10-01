import authorization from '../../../../middleware/authorization';

import getSurvey from './getSurvey';
import getSurveys from './getSurveys';

const express = require('express');

const surveysRouter = express.Router();

surveysRouter.get(
  '/:surveyId',
  authorization(['client']),
  getSurvey
);

surveysRouter.get(
  '/',
  authorization(['client']),
  getSurveys
);

export default surveysRouter;
