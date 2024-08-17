// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import client from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    await client.query(
      'INSERT INTO users(email, password) VALUES($1, $2)',
      [email, hashedPassword]
    );

    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
}
