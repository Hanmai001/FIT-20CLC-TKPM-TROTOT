import { createPool } from 'mysql2/promise';
import dotenv from "dotenv";
dotenv.config();

const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

export default db;