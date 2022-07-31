export default {
  type: 'object',
  required: ['amount', 'sale_price', 'sales_id', 'product_id'],
  properties: {
    amount: {
      type: 'number',
      minLength: 1
    },
    sale_price: {
      type: 'number',
      minLength: 1
    },
    sales_id: {
      type: 'number',
      minLength: 1
    },
    product_id: {
      type: 'number',
      minLength: 1
    }
  }
};
