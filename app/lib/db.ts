// lib/db.ts
import { Client } from 'pg';

// Create a new PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // For SSL connections, required by some cloud providers
  },
});

// Connect to the database
client.connect();

export default client;

export async function getUserByEmail(email: string) {
  const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

export async function getUserById(userId: string) {
  const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
  return result.rows[0];
}