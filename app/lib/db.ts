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

// Add this function to insert calorie data
export async function insertCalories(userId: string, date: string, calories: number) {
  const result = await client.query(
    'INSERT INTO calories (user_id, date, calories) VALUES ($1, $2, $3) RETURNING *',
    [userId, date, calories]
  );
  return result.rows[0];
}

export async function getCaloriesByUserId(userId: number) {
  const result = await client.query(
    'SELECT date, calories FROM calories WHERE user_id = $1 ORDER BY date',
    [userId]
  );
  return result.rows;
}