import { NextApiRequest, NextApiResponse } from 'next';
import { getCaloriesByUserId } from '../../app/lib/db'; // Ensure the correct import path

// Define the structure of the response
interface ApiResponse {
  calories?: any[];
  message?: string;
}

// API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === 'GET') {
    try {
      const userId = parseInt(req.query.userId as string, 10); // Extract userId from the query parameters

      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const result = await getCaloriesByUserId(userId);

      // Return the fetched data
      res.status(200).json({ calories: result });
    } catch (error) {
      console.error('Error fetching calories data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
