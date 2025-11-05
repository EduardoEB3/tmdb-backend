import express from 'express';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.routes';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/health', healthRoutes);

export default app;
