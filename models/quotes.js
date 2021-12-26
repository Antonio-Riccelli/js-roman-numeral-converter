import query from "../db/index.js";

export async function getAllQuotes() {
    const sqlString = `SELECT * FROM quotes`;
    const data = await query(sqlString);
    // console.log(data.rows);
    return data.rows;
}

export async function getQuoteById(num) {
    const sqlString = `SELECT * FROM quotes WHERE id = $1`;
    const data = await query(sqlString, [num]);
    console.log(data.rows);
    return data.rows;
}

export async function addQuote(quoteObj) {
    const author = quoteObj.author;
    const quote = quoteObj.quote;
    const sqlString = `INSERT INTO quotes (author, quote) VALUES $1 $2`;
    const data = await query(sqlString, [author, quote]);
    console.log(data.rows);
    return data.rows;
}