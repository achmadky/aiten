// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import { getUserByEmail } from '../../app/lib/db'; // Replace with your DB access logic

const SECRET_KEY = process.env.JWT_SECRET_KEY || '';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const user = await getUserByEmail(email); // Validate user and password

    if (user && user.password === password) { // You should hash passwords in production
      const token = sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
