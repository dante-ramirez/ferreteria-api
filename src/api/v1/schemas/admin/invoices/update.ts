export default {
  type: 'object',
  required: ['file'],
  properties: {
    file: {
      required: ['filename'],
      filename: {
        type: 'string',
        minLength: 1
      }
    }
  }
};
