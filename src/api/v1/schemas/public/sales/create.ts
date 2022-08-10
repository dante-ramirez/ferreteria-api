export default {
  type: 'object',
  required: ['code', 'date', 'total', 'subtotal'],
  properties: {
    code: {
      type: 'string',
      minLength: 1
    },
    date: {
      type: 'string',
      minLength: 1
    },
    total: {
      type: 'number',
      minimum: 0
    },
    subtotal: {
      type: 'number',
      minimum: 0
    }
  }
};
