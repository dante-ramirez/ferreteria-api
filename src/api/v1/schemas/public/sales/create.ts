export default {
  type: 'object',
  required: ['code', 'date', 'subtotal', 'discountPoints', 'total'],
  properties: {
    code: {
      type: 'string',
      minLength: 1
    },
    date: {
      type: 'string',
      minLength: 1
    },
    subtotal: {
      type: 'number',
      minimum: 0
    },
    discountPoints: {
      type: 'number',
      minimum: 0
    },
    total: {
      type: 'number',
      minimum: 0
    }
  }
};
