import './config/project.config';
import express from 'express';
import healthRoutes from './routes/health.routes';
import itemsRoutes from './routes/items.routes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swagger.config';

const app = express();
app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/items', itemsRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));

app.use(errorHandler);

export default app;
