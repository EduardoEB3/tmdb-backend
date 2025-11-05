import './config/project.config';
import express from 'express';
import healthRoutes from './routes/health.routes';
import itemsRoutes from './routes/items.routes';

const app = express();
app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/items', itemsRoutes);

export default app;
