// pages/api/[table]/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { table, data } = req.body; // 'table' là tên bảng, 'data' là object dữ liệu

  try {
    const pool = await connectToDatabase();

    // Tạo tên stored procedure dạng: sp_Insert_<TableName>
    const procedureName = `sp_Insert_${table}`;
    const request = pool.request();

    // Thêm các tham số đầu vào từ object data
    Object.entries(data).forEach(([key, value]) => {
      request.input(key, value);
    });

    await request.execute(procedureName);
    res.status(200).json({ message: 'Insert successful' });
  } catch (error) {
    console.error('Insert error:', error);
    res.status(500).json({ message: 'Insert failed', error });
  }
}
