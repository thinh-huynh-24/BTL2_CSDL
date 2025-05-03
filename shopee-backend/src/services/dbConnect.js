// db.js
const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '123',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'SHOPPE',
  options: {
    encrypt: true,
    trustServerCertificate: process.env.NODE_ENV !== 'production',
    connectTimeout: 30000
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let pool;

async function getConnectionPool() {
  if (pool) return pool;
  
  try {
    pool = await sql.connect(config);
    console.log('Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  if (pool) {
    await pool.close();
    console.log('SQL Server connection closed');
  }
  process.exit(0);
});

module.exports = {
  sql,
  getConnectionPool,
  closePool: async () => {
    if (pool) await pool.close();
  }
};