import { Request, Response, NextFunction } from 'express';

export const validateItemsQuery = (req: Request, res: Response, next: NextFunction) => {
  const { query, page, pageSize } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'query is required' });
  }

  if (page && isNaN(Number(page))) {
    return res.status(400).json({ message: 'page must be a number' });
  }

  if (pageSize && isNaN(Number(pageSize))) {
    return res.status(400).json({ message: 'pageSize must be a number' });
  }

  next();
};

export const validateItemId = (req: Request, res: Response, next: NextFunction) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).json({ message: 'id must be a number' });
  }

  next();
};
