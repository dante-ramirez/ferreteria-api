export default {
  type: 'object',
  required: ['path'],
  properties: {
    path: {
      type: 'string',
      minLength: 1
    }
  }
};
