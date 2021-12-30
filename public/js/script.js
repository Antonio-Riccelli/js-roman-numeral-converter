import romanNumerals from "./numerals.js";
import convertToRoman from "./conversion.js";

// NUMBER CONVERSION CODE [start]

// VALIDATE USER INPUT
const validate = function(input) {
    if (typeof input === 'number' && input >= 1 && input <= 5999) {
        console.log(`This is a valid input: ${input}. Data type: ${typeof input}.`)
        return input;
    } else {
        let error = Error('Please input a valid number between 1 and 5999.\nEven Justinian is laughing at you.');
        console.error(error);
        return error;
    }
} 
   
// ADD ROMAN NUMERAL TO HTML
function outputRomanNumeral(roman) {
    let par = document.getElementById("output");
    par.classList.remove("bg-danger", "text-white", "error-message")   
    par.innerText = roman;
    par.classList.add("border-bottom","border-dark","border-2" );
}

// DISPLAY ERROR
function outputError(error) {
    let par = document.getElementById("output");
    par.innerText = error.message;
    par.classList.add("border-bottom","border-dark","border-2", "bg-danger", "text-white", "error-message");
    throw error;
}

function playAudio() {
    let audio = document.getElementById("audio");
    audio.play();
}

// DISPLAY ERROR POPUP
function displayPopup() {
    let popupDiv = document.querySelector(".popup");
    let popup = document.querySelector("#justinian");
    popup.style.display = "inline-block";
    popup.style.visibility = "visible";
    popup.style.animation = "fadeIn 2s";
    popupDiv.style.display = "inline-block";
    popupDiv.style.visibility = "visible";
    popupDiv.style.animation = "fadeIn 2s";
    console.log("Function executed")
}

// GET USER INPUT
const getUserInput = function(ev) {
    let num = document.querySelector("form").elements[0].value;
    num = Number(num);
    console.log(`This is the current user input: ${num}.\nIts data type is ${typeof num}.`)
    return num;
}

// THE FUNCTION TO EXECUTE ALL FUNCTIONS

function convertAndDisplay(){
let userInput = getUserInput();
console.log(`This is what userInput returned: ${userInput}. Data type: ${typeof userInput}.`)
let validatedInput = validate(userInput);
if (typeof validatedInput === 'object') {
    displayPopup();
    playAudio();
    outputError(validatedInput);

}
let convertedNumber = convertToRoman(validatedInput);
outputRomanNumeral(convertedNumber);
}

// GET ELEMENT AND ADD CLICK EVENT LISTENER
const init = function() {
    document.getElementById("button-send").addEventListener("click", convertAndDisplay);
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


// RETRIEVE ALL QUOTES

const getQuotesUponUserRequest = () => {
    const idInput = document.getElementById("quote-id").value;

if (idInput === 0 || !idInput) {
    quotes.forEach(quote => {
        const quotesContainer = document.getElementById("quotes-container");
        const newQuoteWrapper = document.createElement("div");
        const authorDiv = document.createElement("div");
        const quoteDiv = document.createElement("q");
        authorDiv.innerText = quote.author;
        authorDiv.classList.toggle("display-6")
        quoteDiv.innerText = quote.quote;
        newQuoteWrapper.appendChild(authorDiv);
        newQuoteWrapper.appendChild(quoteDiv);
        quotesContainer.appendChild(newQuoteWrapper);
    })
}
}

function activateQuoteRequestInput() {
    const quoteButton = document.getElementById("quote-button");
    quoteButton.addEventListener("click", getQuotesUponUserRequest);
}

activateQuoteRequestInput()

// LIGHT/DARK MODE 
let state = "light";

const toggleMode = () => {
if (state === "light") {
    state === "dark";
    document.body.style.color = "black";
} else {
    state === "light";
    document.body.style.color = "white";
}
const source = modePicture.src;
if (/color/.test(source)) {
    modePicture.src = "images/sun-warm.svg"
} else {
modePicture.setAttribute("src", "images/sun-color.svg")
}
let navbar = document.querySelector("nav");
navbar.classList.toggle("bg-dark");
navbar.classList.toggle("bg-light");
}

const modePicture = document.querySelector("#mode");
modePicture.addEventListener("click", toggleMode);


export {getUserInput, convertToRoman, updateQuote, getRandomInt, outputRomanNumeral }