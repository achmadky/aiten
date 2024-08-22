// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the email is already registered
    const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Insert new user
    await client.query(
      'INSERT INTO users (email, password, created_at) VALUES ($1, $2, NOW())',
      [email, password]
    );

    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
