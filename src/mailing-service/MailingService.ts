import NodeMailerService from './services/nodemailer';
import ConsoleService from './services/console';
import { MailParams } from './interfaces';
import { MailingServiceError, UnsupportedMailingServiceDriver } from './errors';
import configuration from './configuration';

const pug = require('pug');

export default class MailingService {
  private service: NodeMailerService | ConsoleService;
  private templatesBasePath: string;
  private webAppBaseUrl: string;
  private apiBaseUrl: string;

  constructor() {
    this.templatesBasePath = `${__dirname}/templates`;
    this.webAppBaseUrl = configuration.webAppBaseUrl;
    this.apiBaseUrl = configuration.apiBaseUrl;

    if (configuration.driver === 'nodemailer') {
      const nodemailerConfiguration = {
        senderAccount: configuration.senderAccount,
        smtpHost: configuration.smtpHost,
        smtpPort: configuration.smtpPort,
        smtpUser: configuration.smtpUser,
        smtpPassword: configuration.smtpPassword
      };

      this.service = new NodeMailerService(nodemailerConfiguration);
    } else if (configuration.driver === 'console') {
      this.service = new ConsoleService();
    } else {
      throw new UnsupportedMailingServiceDriver(configuration.driver);
    }
  }

  // async sendPassword(params: MailParams, password: string) {
  //   const subject = 'Credenciales para la la plataforma Ferre5';
  //   const templatePath = `${this.templatesBasePath}/password.pug`;
  //   const templateParams = {
  //     password,
  //     receiverName: params.receiverName,
  //     email: params.receivers[0] || '',
  //     webAppBaseUrl: this.webAppBaseUrl
  //   };

  //   let template: string;

  //   try {
  //     template = await pug.renderFile(templatePath, templateParams);
  //   } catch (error: any) {
  //     throw new MailingServiceError(error);
  //   }

  //   try {
  //     await this.service.send(
  //       params.receivers,
  //       subject,
  //       template
  //     );
  //   } catch (error: any) {
  //     throw new MailingServiceError(error);
  //   }
  // }

  async sendAccountVerificationToken(params: MailParams, token: string) {
    const subject = 'Confirmación de registro en la plataforma Ferre5';
    const templatePath = `${this.templatesBasePath}/accountVerification.pug`;
    const templateParams = {
      receiverName: params.receiverName,
      verificationUrl: `${this.apiBaseUrl}/api/v1/public/users/account/verified?token=${token}`
    };

    let template: string;

    try {
      template = await pug.renderFile(templatePath, templateParams);
    } catch (error: any) {
      throw new MailingServiceError(error);
    }

    try {
      await this.service.send(
        params.receivers,
        subject,
        template
      );
    } catch (error: any) {
      throw new MailingServiceError(error);
    }
  }

  async sendInvoice(params: MailParams) {
    const subject = 'Factura de compra de la plataforma Ferre5';
    const templatePath = `${this.templatesBasePath}/invoice.pug`;
    const templateParams = {
      receiverName: params.receiverName
    };

    let template: string;

    try {
      template = await pug.renderFile(templatePath, templateParams);
    } catch (error: any) {
      throw new MailingServiceError(error);
    }

    try {
      await this.service.send(
        params.receivers,
        subject,
        template,
        params.attachments
      );
    } catch (error: any) {
      throw new MailingServiceError(error);
    }
  }
}
