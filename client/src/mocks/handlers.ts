import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:3000/api/posts', () => {
    return HttpResponse.json([
      { id: 1, title: 'Post 1', content: 'Content 1' },
      { id: 2, title: 'Post 2', content: 'Content 2' },
    ]);
  }),
];

export const errorHandlers = [
  http.get('http://localhost:3000/api/posts', () => {
    return new HttpResponse(null, { status: 500 });
  }),
];
