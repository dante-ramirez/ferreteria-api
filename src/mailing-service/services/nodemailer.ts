import { Attachment as _Attachment } from '../interfaces';
import { MailingServiceError } from '../errors';

const nodemailer = require('nodemailer');

interface Configuration {
  senderAccount: string
  smtpHost: string,
  smtpPort: number,
  smtpUser: string,
  smtpPassword: string
}

export default class NodeMailerService {
  private transporter: any;
  private senderAccount: string;

  constructor(configuration: Configuration) {
    this.senderAccount = configuration.senderAccount;
    this.transporter = nodemailer.createTransport({
      host: configuration.smtpHost,
      port: configuration.smtpPort,
      secure: configuration.smtpPort === 465,
      auth: {
        user: configuration.smtpUser,
        pass: configuration.smtpPassword
      }
    });
  }

  async send(
    to: string[],
    subject: string,
    template: string,
    attachments: _Attachment[] = []
  ): Promise<any> {
    const receivers = to.join();
    let info: any;

    try {
      info = await this.transporter.sendMail({
        from: this.senderAccount,
        to: receivers,
        text: subject,
        html: template,
        subject,
        attachments
      });
    } catch (error: any) {
      throw new MailingServiceError(error);
    }

    return info;
  }
}
