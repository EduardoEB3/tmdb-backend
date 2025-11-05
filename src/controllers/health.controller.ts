import { Request, Response } from 'express';

export class HealthController {
  check = (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  };
}
