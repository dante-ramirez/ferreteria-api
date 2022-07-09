export default {
  type: 'object',
  required: ['amount'],
  properties: {
    amount: {
      type: 'number',
      minimum: 0
    }
  }
};
