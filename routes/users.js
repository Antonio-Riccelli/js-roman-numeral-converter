import express from "express";
const router = express.Router();

// IMPORT FUNCTIONS
import { getAllQuotes, getQuoteById, addQuote } from "../models/quotes.js";

/* GET ALL QUOTES. */
router.get("/quotes", async function (req, res, next) {
  const quotes = await getAllQuotes();
  res.json({success: true, 
            message: "All quotes have been retrieved.",
            payload: quotes });
});

// GET QUOTES BY ID
router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const quote = await getQuoteById(id);
  res.json({
    success: true,
    message: "This is the quote you retrieved",
    payload: quote
  })
})

// ADD A NEW QUOTE
router.post("/", async function (req, res) {
  const newItem = req.body;
  const data = await addQuote(newItem);
  res.json({
    success: true,
    message: "You have successfully added a new quote!",
    payload: data
  })
})

export default router;
