// pages/api/[table]/call-function.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { functionName, params } = req.body;

  try {
    const pool = await connectToDatabase();
    const request = pool.request();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        request.input(key, value);
      });
    }

    const result = await request.query(`SELECT dbo.${functionName}(${Object.keys(params || {}).map(k => `@${k}`).join(', ')}) AS Result`);

    res.status(200).json({ result: result.recordset[0].Result });
  } catch (error) {
    console.error('Function call error:', error);
    res.status(500).json({ message: 'Function call failed', error });
  }
}
