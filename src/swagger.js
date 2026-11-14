import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Clinica Salud Integral',
    description: 'Documentación generada automáticamente',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const routes = ['./index.ts']; 

swaggerAutogen()(outputFile, routes, doc);
