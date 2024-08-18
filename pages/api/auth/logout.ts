// pages/api/logout.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  // For JWT, just clear the token on the client side
  // Here we only respond with a success message

  res.status(200).json({ message: 'Logged out successfully' });
}
