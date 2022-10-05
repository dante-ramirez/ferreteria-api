import logger from './logger';
import config from '../../configuration';

const cron = require('node-cron');
const fetch = require('node-fetch');

const { apiBaseUrl } = config;

class Cron {
  static async enablePoints() {
    fetch(`${apiBaseUrl}/api/v1/public/wallets/enable-points`, {
      method: 'PUT'
    })
      .then((Response: { json: () => any; }) => Response.json())
      .then((data: any) => logger.log(data))
      .catch((error: any) => logger.error('Error:', error));
  }
}

cron.schedule('0 0 * * Mon', async () => {
  Cron.enablePoints();
});

export default new Cron();
