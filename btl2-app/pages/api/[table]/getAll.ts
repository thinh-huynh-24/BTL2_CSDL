// pages/api/[table]/getAll.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { table, filters } = req.body;

  try {
    const pool = await connectToDatabase();
    const procedureName = `sp_Select_${table}`;
    const request = pool.request();

    // Thêm các tham số lọc nếu có
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        request.input(key, value);
      });
    }

    const result = await request.execute(procedureName);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('GetAll error:', error);
    res.status(500).json({ message: 'GetAll failed', error });
  }
}
