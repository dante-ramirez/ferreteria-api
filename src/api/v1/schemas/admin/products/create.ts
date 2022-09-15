export default {
  type: 'object',
  required: [
    'name', 'description', 'stock', 'code', 'price',
    'rewardPoints', 'model', 'pathImage1', 'pathImage2', 'pathImage3',
    'pathImage4', 'departmentId', 'categoryId', 'brandId'
  ],
  properties: {
    name: {
      type: 'string',
      minLength: 1
    },
    description: {
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
    pathImage1: {
      type: 'string',
      minLength: 1
    },
    pathImage2: {
      type: 'string',
      minLength: 1
    },
    pathImage3: {
      type: 'string',
      minLength: 1
    },
    pathImage4: {
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
    }
  }
};
