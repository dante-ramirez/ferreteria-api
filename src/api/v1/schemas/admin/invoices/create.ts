export default {
  type: 'object',
  required: ['body', 'file'],
  properties: {
    body: {
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
      filename: {
        type: 'string',
        minLength: 1
      }
    }
  }
};
