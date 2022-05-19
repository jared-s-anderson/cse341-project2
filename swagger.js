const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'List of contacts'
  },
  // This can be switched to localhost 8080.
  host: 'cse341-comics.herokuapp.com',
  schemes: ['http', 'https']
};

const outputFile = 'swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
