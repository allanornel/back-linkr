import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "PROD") {
  databaseConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const db = new Pool(databaseConfig);

export default db;
