// pages/api/[table]/update.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { table, data } = req.body;

  try {
    const pool = await connectToDatabase();

    const procedureName = `sp_Update_${table}`;
    const request = pool.request();

    Object.entries(data).forEach(([key, value]) => {
      request.input(key, value);
    });

    await request.execute(procedureName);
    res.status(200).json({ message: 'Update successful' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Update failed', error });
  }
}
