/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
export default {
  type: 'object',
  required: ['name', 'description', 'stock', 'price', 'code', 'discount', 
  'reward_points', 'model', 'path_image1', 'path_image2', 'path_image3', 
  'path_image4', 'department_id', 'category_id', 'brand_id', 'offers_id'],
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
    price: {
      type: 'number',
      minimum: 0
    },
    code: {
      type: 'string',
      minLength: 1
    },
    discount: {
      type: 'number',
      minimum: 0
    },
    reward_points: {
      type: 'number',
      minimum: 0
    },
    model: {
      type: 'string',
      minLength: 1
    },
    path_image1: {
      type: 'string',
      minLength: 1
    },
    path_image2: {
      type: 'string',
      minLength: 1
    },
    path_image3: {
      type: 'string',
      minLength: 1
    },
    path_image4: {
      type: 'string',
      minLength: 1
    },
    department_id: {
      type: 'number',
      minimum: 0
    },
    category_id: {
      type: 'number',
      minimum: 0
    },
    brand_id: {
      type: 'number',
      minimum: 0
    },
    offers_id: {
      type: 'number',
      minimum: 0
    }
  }
};
