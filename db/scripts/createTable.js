import query from "../index.js"

export default async function createTable() {
    const sqlString = `CREATE TABLE quotes (id SERIAL PRIMARY KEY, author TEXT, quote TEXT);`
    const data = await query(sqlString);
    console.log("Data:", data);
    return data;
}

createTable();