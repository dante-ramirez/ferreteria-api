export class MailingServiceError extends Error {
  properties: any;
}

export class UnsupportedMailingServiceDriver extends MailingServiceError {
  constructor(driver: string) {
    super(`${driver} is not a valid mailing service driver`);
  }
}
