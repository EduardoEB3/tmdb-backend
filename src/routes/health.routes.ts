import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

const router: Router = Router();

const controller: HealthController = new HealthController();

router.get('/', controller.check);

export default router;
