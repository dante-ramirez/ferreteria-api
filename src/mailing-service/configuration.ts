import configuration from '../../configuration';

export default {
  webAppBaseUrl: configuration.webAppBaseUrl,
  apiBaseUrl: configuration.apiBaseUrl,
  driver: configuration.mailing.driver,
  senderAccount: configuration.mailing.senderAccount,
  smtpHost: configuration.mailing.smtpHost,
  smtpPort: configuration.mailing.smtpPort,
  smtpUser: configuration.mailing.smtpUser,
  smtpPassword: configuration.mailing.smtpPassword
};
