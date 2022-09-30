export default {
  type: 'object',
  required: ['link'],
  properties: {
    link: {
      type: 'string',
      minLength: 1
    }
  }
};
