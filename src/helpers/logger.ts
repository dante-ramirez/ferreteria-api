/* eslint-disable no-console */
class Logger {
  log(message: any) {
    console.log(message);
  }

  error(message: any, error: any) {
    console.error(message, error);
  }
}

export default new Logger();
