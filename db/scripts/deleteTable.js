import query from "../index.js";

export default async function deleteTable() {
    const sqlString = `DROP TABLE IF EXISTS quotes;`
    const data = await query(sqlString);
    console.log(data);
    return data;
}

deleteTable();