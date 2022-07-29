export default {
  type: 'object',
  required: ['name', 'discount'],
  properties: {
    name: {
      type: 'string',
      minLength: 1
    },
    discount: {
      type: 'number',
      minimum: 0
    }
  }
};
