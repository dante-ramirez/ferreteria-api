export default {
  type: 'object',
  required: ['body', 'files'],
  properties: {
    body: {
      required: [
        'name', 'details', 'stock', 'code', 'price',
        'rewardPoints', 'model', 'departmentId', 'categoryId', 'brandId', 'individualOfferId'
      ],
      name: {
        type: 'string',
        minLength: 1
      },
      details: {
        type: 'string',
        minLength: 1
      },
      stock: {
        type: 'number',
        minimum: 0
      },
      code: {
        type: 'string',
        minLength: 1
      },
      price: {
        type: 'number',
        minimum: 0
      },
      rewardPoints: {
        type: 'number',
        minimum: 0
      },
      model: {
        type: 'string',
        minLength: 1
      },
      departmentId: {
        type: 'number',
        minimum: 0
      },
      categoryId: {
        type: 'number',
        minimum: 0
      },
      brandId: {
        type: 'number',
        minimum: 0
      },
      individualOfferId: {
        type: 'number',
        minimum: 0
      }
    },
    files: {
      type: 'array',
      minItems: 1,
      maxItems: 4,
      items: [{
        required: ['filename'],
        filename: {
          type: 'string',
          minLength: 1
        }
      }]
    }

  }
};
