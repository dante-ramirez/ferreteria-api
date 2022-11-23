import axios from 'axios';
import config from '../../configuration';
import logger from './logger';

const cron = require('node-cron');

const { apiBaseUrl } = config;

class Cron {
  static async enablePoints() {
    let res: any;

    try {
      res = await axios.put(`${apiBaseUrl}/api/v1/public/wallets/points/enabled`);
    } catch (error: any) {
      if (error.response) {
        logger.error('ErrorResponse:', {
          status: error.response.status,
          statusText: error.response.statusText,
          code: error.response.data.code
        });
      } else if (error.request) {
        logger.error('ErrorRequest:', error.request);
      }

      return logger.error('ErrorMessage:', error.message);
    }

    return logger.log({ status: res.status, statusText: res.statusText, data: res.data });
  }

  static async verifyOffers() {
    let res: any;

    try {
      res = await axios.put(`${apiBaseUrl}/api/v1/admin/brands/offers/verified`);

      logger.log({ status: res.status, statusText: res.statusText, data: res.data });
    } catch (error: any) {
      if (error.response) {
        logger.error('ErrorResponse:', {
          status: error.response.status,
          statusText: error.response.statusText,
          code: error.response.data.code
        });
      } else if (error.request) {
        logger.error('ErrorRequest:', error.request);
      }

      logger.error('ErrorMessage:', error.message);
    }

    try {
      res = await axios.put(`${apiBaseUrl}/api/v1/admin/categories/offers/verified`);

      logger.log({ status: res.status, statusText: res.statusText, data: res.data });
    } catch (error: any) {
      if (error.response) {
        logger.error('ErrorResponse:', {
          status: error.response.status,
          statusText: error.response.statusText,
          code: error.response.data.code
        });
      } else if (error.request) {
        logger.error('ErrorRequest:', error.request);
      }

      logger.error('ErrorMessage:', error.message);
    }

    try {
      res = await axios.put(`${apiBaseUrl}/api/v1/admin/departments/offers/verified`);

      logger.log({ status: res.status, statusText: res.statusText, data: res.data });
    } catch (error: any) {
      if (error.response) {
        logger.error('ErrorResponse:', {
          status: error.response.status,
          statusText: error.response.statusText,
          code: error.response.data.code
        });
      } else if (error.request) {
        logger.error('ErrorRequest:', error.request);
      }

      logger.error('ErrorMessage:', error.message);
    }

    try {
      res = await axios.put(`${apiBaseUrl}/api/v1/admin/individualOffers/offers/verified`);

      logger.log({ status: res.status, statusText: res.statusText, data: res.data });
    } catch (error: any) {
      if (error.response) {
        logger.error('ErrorResponse:', {
          status: error.response.status,
          statusText: error.response.statusText,
          code: error.response.data.code
        });
      } else if (error.request) {
        logger.error('ErrorRequest:', error.request);
      }

      logger.error('ErrorMessage:', error.message);
    }

    return logger.log('Offers verified successfully');
  }
}

cron.schedule('0 0 * * Mon', async () => {
  Cron.enablePoints();
});

cron.schedule('*/30 * * * *', async () => {
  Cron.verifyOffers();
});

export default new Cron();
