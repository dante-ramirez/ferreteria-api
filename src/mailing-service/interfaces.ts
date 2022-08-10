export interface Attachment {
  filename: string
  content: Buffer
}

export interface MailParams {
  receivers: string[],
  attachments: Attachment[],
  receiverName: string,
}
