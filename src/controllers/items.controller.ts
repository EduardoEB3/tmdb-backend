import { RequestHandler } from 'express';
import { TMDBService } from '../services/tmdb.service';

export class ItemController {
  constructor(private readonly tmdbService: TMDBService) {}

  getItems: RequestHandler = async (req, res) => {
    try {
      const { query, page, pageSize } = req.query;

      const data = await this.tmdbService.searchMovies(
        query as string,
        page ? +page : undefined,
        pageSize ? +pageSize : undefined,
      );

      res.json(data);
    } catch (_err) {
      res.status(500).json({ message: 'Error fetching data' });
    }
  };
}
