import axios, { AxiosInstance } from 'axios';
import { projectConfig } from '../config/project.config';

export class TMDBService {
  private client: AxiosInstance;

  constructor(private token: string) {
    this.client = axios.create({
      baseURL: projectConfig.tmdbBaseURL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async searchMovies(
    query: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<Record<string, unknown>[]> {
    const { data } = await this.client.get('/search/movie', {
      params: { query, page },
    });

    return data.results.slice(0, pageSize).map(this.normalizeMovie);
  }

  private normalizeMovie(movie: Record<string, unknown>): Record<string, unknown> {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
    };
  }
}
