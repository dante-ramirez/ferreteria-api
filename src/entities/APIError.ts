export default class APIError extends Error {
  properties: any;
  constructor(error: unknown) {
    super(String(error));
    this.properties = error;
  }
}
