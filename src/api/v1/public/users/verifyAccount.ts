import { ItemNotFound } from '../../../../database/errors';
import _User from '../../../../entities/User';
import _Request from '../../../../definitions/request';
import config from '../../../../../configuration';
import logger from '../../../../helpers/logger';

const jwt = require('jsonwebtoken');

export default async function (req: _Request, res: any) {
  const {
    database,
    query
  } = req;
  const {
    token
  } = query;

  let decodedToken;

  try {
    decodedToken = jwt.verify(
      token,
      config.jwt.secret,
      { algorithms: [config.jwt.algorithm] }
    );
  } catch (error) {
    if ((error as any).message === 'jwt expired') {
      return res.status(401).send({ code: 'JWT_EXPIRED' });
    }

    logger.log(error);
    return res.status(400).send({ error, code: 'BAD_JWT_TOKEN' });
  }

  try {
    await database.users.verifyById(Number(decodedToken.id));
  } catch (error) {
    let errorCode = 'UNEXPECTED_ERROR';
    let statusCode = 500;

    if (error instanceof ItemNotFound) {
      statusCode = 404;
      errorCode = 'USER_WAS_NOT_FOUND';
    }

    logger.log(error);
    return res.status(statusCode).send({ code: errorCode });
  }

  return res.status(200).send(`
    <html style="height: 100%; width: 100%;">
      <header>
        <div style="border-radius: 15px; text-align: center; width: 100%;">
          <img style="margin: 1.5rem 0; width: 25%;" src="" alt="Logo Ferre5"/>
        </div>
      </header>
      <body style="text-align: center; color: #5c5c5c; font-family: 'Roboto';">
        <div style="margin: 0 auto; width: 50%;">
          <div style="margin: 32px 0px;">
            <span style="font-size: 42px;">
              Su cuenta ha sido verificada con éxito.
            </span>
          </div>
          <div style="margin: 32px 0px;"> 
            <span style="font-size: 28px;">
              Para continuar usando nuestros servicios haga clic en el botón de iniciar sesión. 
            </span>
          </div>
        </div>
        <div style="margin: 15px auto; width: 100%; padding-top: 15px;
        padding-bottom: 58px; font-size: 32px; color: #ffffff;">
          <br/>
            <span style="font-weight: 600;"> 
              <a style="color: #5c5c5c;" name="verify" href="${config.webAppBaseUrl}">
                Iniciar sesión 
              </a>             
            </span>
          <br/>
        </div>
        <div style="text-align: center; font-family: 'Roboto'; color: #ffffff;">
          <div style="
            margin: 0 auto; 
            background-color: #244c5a; 
            position: relative;
            padding: 22px;
            border-radius: 10px;
            transform: translate(-50%, 0);
            bottom: 0;
            left: 50%;
          ">
            <span style="font-size: 16px; font-weight: 500;">
              Desarrollado por
            </span>
            <br/><br/>
            <img src="" alt="Logo Ferre5"/>
          </div>
        </div>
      </body>
    </html>
  `);
}
