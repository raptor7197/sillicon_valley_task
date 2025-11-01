import { Pool } from 'pg';

const setup = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `);

  await pool.end();
};

setup();
