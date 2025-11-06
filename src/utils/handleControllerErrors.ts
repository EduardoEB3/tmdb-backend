import { RequestHandler } from 'express';
import { isAxiosError } from 'axios';

export function handleControllerErrors(handler: RequestHandler): RequestHandler {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const status = err.response?.status ?? 500;
        const data = err.response?.data ?? { message: 'Unknown error from TMDB' };
        return res.status(status).json(data);
      }

      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      }

      res.status(500).json({ message: 'Unexpected error' });
    }
  };
}
