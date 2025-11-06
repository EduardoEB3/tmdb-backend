import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TMDB API BFF',
      version: '1.0.0',
      description: 'API that exposes endpoints for querying movies from TMDB',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
    ],
    components: {
      schemas: {
        Movie: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 550,
              description: 'Unique identifier of the movie in TMDB',
            },
            title: {
              type: 'string',
              example: 'Fight Club',
              description: 'Movie title',
            },
            overview: {
              type: 'string',
              example: 'A ticking-time-bomb insomniac and a slippery soap salesman...',
              description: 'Movie synopsis',
            },
            release_date: {
              type: 'string',
              format: 'date',
              example: '1999-10-15',
              description: 'Date when the movie was released',
            },
            poster_path: {
              type: ['string', 'null'],
              example: 'https://image.tmdb.org/t/p/w500/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg',
              description: 'Full URL to the movie poster image (or null if not available)',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};
