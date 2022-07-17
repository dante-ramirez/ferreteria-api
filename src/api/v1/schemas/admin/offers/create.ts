export default {
  type: 'object',
  required: ['name', 'discount', 'type', 'finish_at'],
  properties: {
    name: {
      type: 'string',
      minLength: 1
    },
    discount: {
      type: 'number',
      minimum: 0
    },
    type: {
      type: 'string',
      minLength: 1
    },
    finish_at: {
      type: 'string',
      minLength: 1
    }
  }
};
