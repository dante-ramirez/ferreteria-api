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
      minLength: 1
    },
    subtotal: {
      type: 'number',
      minLength: 1
    }
  }
};
