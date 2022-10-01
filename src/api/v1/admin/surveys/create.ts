import _Request from '../../../../definitions/request';
import { ItemAlreadyExist } from '../../../../database/errors';
import Survey from '../../../../entities/Survey';
import logger from '../../../../helpers/logger';

export default async function (req: _Request, res: any) {
  const {
    database,
    body
  } = req;
  const {
    link
  } = body;

  let survey = new Survey(
    0,
    link
  );

  try {
    survey = await database.surveys.create(survey);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemAlreadyExist) {
      statusCode = 400;
      errorCode = 'SURVEY_ALREADY_EXIST';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(201).send(survey.serialize());
}
