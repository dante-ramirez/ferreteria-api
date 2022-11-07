import Department from '../../../../entities/Department';
import { ItemNotFound } from '../../../../database/errors';
import Request from '../../../../definitions/request';
import logger from '../../../../helpers/logger';

export default async function (req: Request, res: any) {
  const { database } = req;

  let departments: Department[];
  const offersUpdated: Department[] = [];
  const currentDate = new Date();

  try {
    departments = await database.departments.getAllWithOffers();

    await Promise.all(departments.map(async (department) => {
      if (Date.parse(department.beginAt) > Date.parse(currentDate.toString())
      || Date.parse(currentDate.toString()) > Date.parse(department.finishAt)) {
        const departmentToUpdate = new Department(
          department.id,
          department.name,
          1,
          department.beginAt,
          department.finishAt
        );

        const offerUpdated = await database.departments.update(departmentToUpdate);
        offersUpdated.push(offerUpdated);
      }
    }));
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'DEPARTMENTS_WERE_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(offersUpdated.map((department) => department.serialize()));
}
