import { NextFunction, Request, Response } from 'express';
import { isAxiosError } from 'axios';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (isAxiosError(err)) {
    const status: number = err.response?.status ?? 500;
    const data: Record<string, unknown> = err.response?.data ?? {
      message: 'Unknown error from TMDB',
    };

    return res.status(status).json(data);
  }

  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }

  res.status(500).json({ message: 'Unexpected error' });
};
