/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check the health status of the service
 *     description: Returns basic information to verify that the service is up and running.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Current health status of the service
 *                   example: ok
 *                 uptime:
 *                   type: number
 *                   description: Uptime of the service in seconds
 *                   example: 1234.56
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp of when the check was made
 *                   example: "2025-11-05T15:30:00.000Z"
 */

import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

const router: Router = Router();

const controller: HealthController = new HealthController();

router.get('/', controller.check);

export default router;
