import query from "../index.js";

export default async function deleteData() {
    const sqlString = `DELETE FROM quotes RETURNING *`;
    const data = await query(sqlString);
    console.log(data.rows);
    return data.rows;
}

deleteData();