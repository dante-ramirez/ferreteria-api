export default {
  type: 'object',
  required: ['sales_id', 'product_id', 'sale_price', 'quantity', 'amount'],
  properties: {
    sales_id: {
      type: 'number',
      minimum: 0
    },
    product_id: {
      type: 'number',
      minimum: 0
    },
    sale_price: {
      type: 'number',
      minimum: 0
    },
    quantity: {
      type: 'number',
      minimum: 0
    },
    amount: {
      type: 'number',
      minimum: 0
    }
  }
};
