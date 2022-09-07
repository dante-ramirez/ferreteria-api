import { ItemNotFound } from '../../../../database/errors';
import _SaleDetail from '../../../../entities/SaleDetail';
import _Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req:_Request, res:any) {
  const {
    database,
    params
  } = req;
  const {
    saleDetailsId
  } = params;

  let saleDetailToDelete: _SaleDetail;

  try {
    saleDetailToDelete = await database.saleDetails.getById(Number(saleDetailsId));
    await database.saleDetails.delete(Number(saleDetailToDelete.id));
  } catch (error) {
    let statusCode = 500;
    let errorCode = 'UNEXPECTED_ERROR';

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'SALE_DETAIL_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send();
}
