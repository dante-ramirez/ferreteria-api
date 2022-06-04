import _Request from '../../../definitions/request';

export default async function (_req:_Request, res:any) {
  return res.status(200).send('Ok');
}
