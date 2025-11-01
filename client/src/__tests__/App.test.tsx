import { render, screen, waitFor } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, describe, it, expect } from 'vitest';
import App from '../App';
import { server } from '../mocks/server';
import { errorHandlers } from '../mocks/handlers';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('renders posts on successful fetch', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Post 2')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  it('handles server error', async () => {
    server.use(...errorHandlers);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />);
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching posts:', expect.any(Error));
    });
    consoleErrorSpy.mockRestore();
  });
});
