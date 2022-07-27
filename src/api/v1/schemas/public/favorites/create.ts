export default {
  type: 'object',
  required: ['product_id'],
  properties: {
    product_id: {
      type: 'number',
      minLength: 1
    }
  }
};
