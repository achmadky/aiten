import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/lib/db'; // Ensure this is the correct import path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, date, calories } = req.body;

  // Validate request body
  if (
    !userId || typeof userId !== 'number' || 
    !date || typeof date !== 'string' || 
    !calories || typeof calories !== 'number'
  ) {
    return res.status(400).json({ message: 'Invalid data types or missing fields' });
  }

  try {
    // Insert calorie data into the database
    await client.query(
      'INSERT INTO calories (user_id, date, calories) VALUES ($1, $2, $3)',
      [userId, date, calories]
    );

    return res.status(201).json({ message: 'Calories data submitted successfully' });
  } catch (error) {
    console.error('Error submitting calorie data:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
