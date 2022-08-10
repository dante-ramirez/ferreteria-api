/* eslint-disable no-console */
import { Attachment as _Attachment } from '../interfaces';

export default class ConsoleService {
  async send(to: string[], subject: string, template: string, attachments: _Attachment[] = []): Promise<string> {
    const receivers = to.join();
    const info = {
      from: 'console',
      to: receivers,
      text: subject,
      html: template,
      subject,
      attachments
    };

    console.log('--------------mail-------------');
    console.log(info);
    console.log('-------------------------------');

    return '';
  }
}
