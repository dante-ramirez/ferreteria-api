export default {
  type: 'object',
  required: ['discount'],
  properties: {
    discount: {
      type: 'number',
      minimum: 0
    }
  }
};
