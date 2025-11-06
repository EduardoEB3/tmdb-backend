import { RequestHandler } from 'express';

export function handleControllerErrors(handler: RequestHandler): RequestHandler {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err: unknown) {
      next(err);
    }
  };
}
