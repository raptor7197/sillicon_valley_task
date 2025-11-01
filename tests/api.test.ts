import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server/src/app';

describe('API Integration Tests', () => {
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
