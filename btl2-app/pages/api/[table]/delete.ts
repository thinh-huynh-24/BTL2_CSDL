// pages/api/[table]/delete.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { table, id } = req.body;

  try {
    const pool = await connectToDatabase();
    const procedureName = `sp_Delete_${table}`;
    const request = pool.request();

    request.input('Id', id); // giả định thủ tục nhận @Id
    await request.execute(procedureName);

    res.status(200).json({ message: 'Delete successful' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Delete failed', error });
  }
}
