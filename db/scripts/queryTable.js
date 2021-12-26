import query from "../index.js";

export default async function queryTable() {
    const sqlString = `SELECT * FROM quotes`;
    const data = await query(sqlString);
    console.log("Data: ", data.fields, data.rows);
    return data.rows;
}

queryTable();