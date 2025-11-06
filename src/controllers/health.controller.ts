import { Request, RequestHandler, Response } from 'express';

export class HealthController {
  check: RequestHandler = (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  };
}
