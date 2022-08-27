export default {
  type: 'object',
  required: ['name', 'offersId', 'beginAt', 'finishAt'],
  properties: {
    name: {
      type: 'string',
      minLength: 1
    },
    offersId: {
      type: 'number',
      minimum: 0
    },
    beginAt: {
      type: 'string',
      minLength: 1
    },
    finishAt: {
      type: 'string',
      minLength: 1
    }
  }
};
