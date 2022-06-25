export default {
  type: 'object',
  required: ['name', 'lastName', 'password'],
  properties: {
    name: {
      type: 'string',
      minLength: 1
    },
    lastName: {
      type: 'string',
      minLength: 1
    },
    password: {
      type: 'string',
      minLength: 1
    }
  }
};
