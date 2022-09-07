export default {
  type: 'object',
  required: ['status'],
  properties: {
    status: {
      type: 'string',
      minLength: 1
    }
  }
};
