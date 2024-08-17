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
