export default {
  type: 'object',
  required: ['body', 'file'],
  properties: {
    body: {
      required: ['userId', 'salesId'],
      userId: {
        type: 'number',
        minimum: 0
      },
      salesId: {
        type: 'number',
        minimum: 0
      }
    },
    file: {
      required: ['filename'],
      filename: {
        type: 'string',
        minLength: 1
      }
    }
  }
};
