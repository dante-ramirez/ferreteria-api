import { ItemNotFound } from '../../../../database/errors';
import { SurveysFilter as _SurveysFilter } from '../../../../database/interfaces';
import _Request from '../../../../definitions/request';
import _Survey from '../../../../entities/Survey';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    query
  } = req;
  const {
    link = '',
    perPage = 0,
    currentPage = 0,
    order = ''
  } = query;

  let surveys: _Survey[];
  let totalCount: number = 0;

  try {
    const filters: _SurveysFilter = {
      link: {
        value: link,
        type: 'like',
        order
      }
    };
    const pagination = {
      offset: Math.abs((currentPage - 1) * perPage),
      limit: perPage
    };

    surveys = await database.surveys.get(filters, pagination);
    totalCount = await database.surveys.count(filters);
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'SURVEYS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  const surveysSerialized = surveys.map((survey) => survey.serialize());
  const paginationResult = {
    currentPage,
    perPage,
    totalItems: totalCount
  };

  return res.status(200).send({
    items: surveysSerialized,
    pagination: paginationResult
  });
}
