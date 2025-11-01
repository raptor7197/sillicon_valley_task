import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import app from '../server/src/app';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Pool } from 'pg';

describe('API Integration Tests', () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;

  beforeAll(async () => {
    container = await new PostgreSqlContainer('postgres:13').start();
    pool = new Pool({ connectionString: container.getConnectionUri() });
    process.env.DATABASE_URL = container.getConnectionUri();

    await pool.query(`
      CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL
      );
    `);
  }, 120000);

  afterAll(async () => {
    await pool.end();
    await container.stop();
  }, 120000);

  it('should get zero posts initially', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new post', async () => {
    const newPost = { title: 'Test Post', content: 'Test Content' };
    const response = await request(app).post('/api/posts').send(newPost);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newPost.title);
    expect(response.body.content).toBe(newPost.content);
  });

  it('should not create a post with missing data', async () => {
    const response = await request(app).post('/api/posts').send({ title: 'Test Post' });
    expect(response.status).toBe(400);
  });

  it('should get all posts', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
