import axios from 'axios';
import config from '../../configuration';
import logger from './logger';

const cron = require('node-cron');

const { apiBaseUrl } = config;

class Cron {
  static async enablePoints() {
    let res: any;

    try {
      res = await axios.put(`${apiBaseUrl}/api/v1/public/wallets/enable-points`);
    } catch (error: any) {
      if (error.response) {
        logger.error('ErrorResponse:', { status: error.response.status, statusText: error.response.statusText, code: error.response.data.code });
      } else if (error.request) {
        logger.error('ErrorRequest:', error.request);
      }

      return logger.error('ErrorMessage:', error.message);
    }

    return logger.log({ status: res.status, statusText: res.statusText, data: res.data });
  }
}

cron.schedule('0 0 * * Mon', async () => {
  Cron.enablePoints();
});

export default new Cron();
