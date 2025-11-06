import { RequestHandler } from 'express';
import { TMDBService } from '../services/tmdb.service';
import { handleControllerErrors } from '../utils/handleControllerErrors';

export class ItemController {
  constructor(private readonly tmdbService: TMDBService) {}

  getItems: RequestHandler = handleControllerErrors(async (req, res) => {
    const { query, page, pageSize } = req.query;

    const data: Record<string, unknown>[] = await this.tmdbService.searchMovies(
      query as string,
      page ? +page : undefined,
      pageSize ? +pageSize : undefined,
    );

    res.json(data);
  });

  getItemById: RequestHandler = handleControllerErrors(async (req, res) => {
    const item: Record<string, unknown> = await this.tmdbService.searchMovieById(+req.params.id);

    res.json(item);
  });
}
