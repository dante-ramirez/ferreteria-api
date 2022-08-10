export default {
  type: 'object',
  required: ['amount', 'sale_price', 'sales_id', 'product_id'],
  properties: {
    amount: {
      type: 'number',
      minimum: 0
    },
    sale_price: {
      type: 'number',
      minimum: 0
    },
    sales_id: {
      type: 'number',
      minimum: 0
    },
    product_id: {
      type: 'number',
      minimum: 0
    }
  }
};
