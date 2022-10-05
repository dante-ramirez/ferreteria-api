import ferreteriaApi from './src/api/v1';
import config from './configuration';
import logger from './src/helpers/logger';

const PORT = config.api.port;
const HOST = config.api.host;

async function initServer() {
  try {
    const app = await ferreteriaApi();
    app.listen(PORT, HOST, () => {
      logger.log(`API listening on ${HOST}:${PORT}`);
    });
  } catch (error) {
    throw error;
  }
}

initServer().catch(error => logger.log(error));
