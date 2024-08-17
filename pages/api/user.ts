// pages/api/user.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { getUserById } from '../../app/lib/db'; // Replace with your DB access logic

const SECRET_KEY = process.env.JWT_SECRET_KEY || '';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
      try {
        const decoded = verify(token, SECRET_KEY) as { userId: string };
        const user = await getUserById(decoded.userId);

        if (user) {
          res.status(200).json({ username: user.username, email: user.email });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      res.status(401).json({ message: 'No token provided' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
