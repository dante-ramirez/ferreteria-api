import ferreteriaApi from './src/api/v1';
import config from './configuration';

const PORT = config.api.port;
const HOST = config.api.host;

async function initServer() {
  try {
    const app = await ferreteriaApi();
    app.listen(PORT, HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on ${HOST}:${PORT}`);
    });
  } catch (error) {
    throw error;
  }
}

// eslint-disable-next-line no-console
initServer().catch(error => console.log(error));
