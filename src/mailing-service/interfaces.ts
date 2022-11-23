export interface Attachment {
  filename: string,
  path: string,
  content?: Buffer
}

export interface MailParams {
  receiverName: string,
  receivers: string[],
  attachments: Attachment[]
}
