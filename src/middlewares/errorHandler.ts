import { Request, Response, NextFunction } from 'express';
import { isAxiosError } from 'axios';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (isAxiosError(err)) {
    const status = err.response?.status ?? 500;
    const data = err.response?.data ?? { message: 'Unknown error from TMDB' };
    return res.status(status).json(data);
  }

  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }

  res.status(500).json({ message: 'Unexpected error' });
};
