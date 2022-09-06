export default {
  type: 'object',
  required: ['points'],
  properties: {
    points: {
      type: 'number',
      minimum: 0
    }
  }
};
