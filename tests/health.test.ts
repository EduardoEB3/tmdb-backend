import request, { Response } from 'supertest';
import app from '../src/app';

describe('HealthController', () => {
  it('should return status 200 with health info', async () => {
    const res: Response = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(typeof res.body.uptime).toBe('number');
    expect(typeof res.body.timestamp).toBe('string');
  });
});
