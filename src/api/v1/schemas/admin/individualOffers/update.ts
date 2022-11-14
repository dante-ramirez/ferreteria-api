export default {
  type: 'object',
  required: ['offersId', 'beginAt', 'finishAt'],
  properties: {
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
