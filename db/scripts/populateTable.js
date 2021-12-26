import query from "../index.js";
import quotes from "../../public/js/quotes.mjs"



export default async function populateTable() {
     quotes.forEach(async function (elem) {
    const author = elem.author;
    const quote = elem.quote;
    const sqlQuery = `INSERT INTO quotes (author, quote) VALUES ($1, $2) RETURNING *`;
    const data = await query(sqlQuery, [author, quote]);
    console.log(data.rows);
    return data.rows;
    })
}

populateTable();