import request, { Response } from 'supertest';
import app from '../src/app';

describe('ItemController', () => {
  it('should return a paginated list of items from TMDB', async () => {
    const res: Response = await request(app)
      .get('/items')
      .query({ query: 'batman', page: 1, pageSize: 5 });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const firstItem: Record<string, unknown> = res.body[0];
    expect(firstItem).toHaveProperty('id');
  });

  it('should return item details for a valid id', async () => {
    const res: Response = await request(app).get('/items/550');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 550);
    expect(res.body).toHaveProperty('title');
  });

  it('should return 404 with proper TMDB error for non-existent id', async () => {
    const res: Response = await request(app).get('/items/9999999999');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('status_message');
  });
});

describe('Items Validation Middlewares', () => {
  describe('GET /items query validation', () => {
    it('should return 400 if query param is missing', async () => {
      const res: Response = await request(app).get('/items');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'query is required');
    });

    it('should return 400 if page is not a number', async () => {
      const res: Response = await request(app)
        .get('/items')
        .query({ query: 'batman', page: 'abc' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'page must be a number');
    });

    it('should return 400 if pageSize is not a number', async () => {
      const res: Response = await request(app)
        .get('/items')
        .query({ query: 'batman', page: '1', pageSize: 'abc' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'pageSize must be a number');
    });
  });

  describe('GET /items/:id path validation', () => {
    it('should return 400 if id is not a number', async () => {
      const res: Response = await request(app).get('/items/abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'id must be a number');
    });
  });
});
