import { ItemNotFound } from '../../../../database/errors';
import _Survey from '../../../../entities/Survey';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    body,
    params
  } = req;
  const {
    link
  } = body;
  const { id } = params;

  let surveyToUpdate: _Survey;

  try {
    surveyToUpdate = await database.surveys.getById(Number(id));
    surveyToUpdate.link = link;

    await database.surveys.update(surveyToUpdate);
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'SURVEY_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(surveyToUpdate.serialize());
}
