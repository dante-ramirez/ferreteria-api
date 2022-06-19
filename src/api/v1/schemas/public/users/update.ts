export default {
  type: 'object',
  required: ['name', 'lastName', 'email'],
  properties: {
    name: {
      type: 'string',
      minLength: 1
    },
    lastName: {
      type: 'string',
      minLength: 1
    },
    email: {
      type: 'string',
      minLength: 1
    }
  }
};
