import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'Intranet SaaS API',
      version: '1.0.0',
      description: 'Multi-tenant intranet SaaS API',
    },

    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },

    security: [{ bearerAuth: [] }],
  },

  apis: ['./src/routes/*.ts'],
});