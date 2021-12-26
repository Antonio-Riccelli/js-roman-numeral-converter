import pg from "pg";
import * as config from "../config.js";

const pool = new pg.Pool ({
    host: config.databaseHost,
    database: config.databaseName,
    user: config.username,
    port: config.dbPort,
    password: config.password,
    connectionString: config.url,
    ssl: {
        rejectUnauthorized: false
    }
})

export default async function query(text, params) {
    return pool.query(text, params);
}