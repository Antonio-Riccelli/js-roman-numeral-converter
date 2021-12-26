import romanNumerals from "./numerals.js";
// import quotes from "./quotes.js";
// import fetch from 'node-fetch';

// NUMBER CONVERSION CODE [start]

// VALIDATE USER INPUT
const validate = function(ev) {
    let message = "";
    if (num >= 1 && num <= 5999 && num.length > 0) {
        return true;
    } else  {
        message = "Please input number between 1 and 5999"
    }
} 
   
// ADD ROMAN NUMERAL TO HTML
function outputRomanNumeral(roman) {
    let par = document.getElementById("output");    
    par.innerText = roman;
    par.classList.add("border-bottom","border-dark","border-2" );
}

// CONVERT TO ROMAN NUMERAL
function convertToRoman(num) {
    let convertedNumber = [];
    let arrFromNum = [...num.toString()].reverse();
    for (let i = 0; i < arrFromNum.length; i++) {
        if (arrFromNum[i] === 0) {
            continue;
        } else {
            convertedNumber.unshift(romanNumerals[i][arrFromNum[i]]);
        }
    }
   outputRomanNumeral(convertedNumber.join(""));
}

// GET USER INPUT
const getUserInput = function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let num = document.querySelector("form").elements[0].value;
    // let verify = validate();
    num = Number(num);
    if (!num || num < 1 || num > 5999) {num = "Output"} else {
    convertToRoman(num);
}
}

// GET ELEMENT AND ADD CLICK EVENT LISTENER
const init = function() {
    document.getElementById("button-send").addEventListener("click", getUserInput);
}

init();

// NUMBER CONVERSION CODE [end]


//------------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------

// QUOTE GENERATOR CODE [start]

// FETCH QUOTE ARRAY FROM HEROKU POSTGRES DATABASE

const url = "http://localhost:3000";

async function getQuotes() {
    const response = await fetch(`${url}/users`);
    const { payload } = await response.json();
    console.log(payload);
    return payload;
}

// GENERATE A RANDOM INTEGER, INCLUSIVE OF MAXIMUM AND MINIMUM VALUE
function getRandomInt(max) {
    let min = 0;
    max = Math.floor(quotes.length - 1);
    let ind = Math.floor(Math.random() * (max - min + 1));
    console.log(ind);
    return ind;
}


// UPDATE QUOTE AND RELATED DOM ELEMENTS
async function updateQuote() {
let ind = getRandomInt(quotes.length);
let authorName = document.getElementById("author");
let quoteElement = document.querySelector("q");
let authorPic = document.getElementById("author-picture");
// console.log(quotes);
authorPic.setAttribute("src", `./images/authors/${quotes[ind].id}-${quotes[ind].author.toLowerCase().split(" ").join("-")}.jpg`)
authorName.innerText = quotes[ind].author;
quoteElement.innerText = quotes[ind].quote;
}

// INVOKE FUNCTIONS
let quotes = await getQuotes();
updateQuote(quotes);
setInterval(updateQuote, 12000)

// QUOTE GENERATOR CODE [end]
