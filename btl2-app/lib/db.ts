// lib/db.ts
import sql from "mssql";

const config: sql.config = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "your_password",
  server: process.env.DB_SERVER || "localhost",
  database: process.env.DB_DATABASE || "BTL2",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function connectToDatabase() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error("Database connection failed", error);
    throw error;
  }
}

export default sql;
