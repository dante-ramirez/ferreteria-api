export default {
  type: 'object',
  required: ['file'],
  properties: {
    file: {
      filename: {
        type: 'string',
        minLength: 1
      }
    }
  }
};
