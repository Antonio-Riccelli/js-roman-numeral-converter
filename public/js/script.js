import romanNumerals from "./numerals.js";
import convertToRoman from "./conversion.js";

let colorMode = true;
let quotesContainerState = false;
let quoteByIdGenerated = false;
let allQuotesGenerated = false;
let quoteByAuthorGenerated = false;

// NUMBER CONVERSION CODE [start]

// VALIDATE USER INPUT
const validate = function (input) {
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
    par.classList.remove("bg-danger", "text-white", "error-message");
     par.innerText = roman;
    par.classList.add("border-bottom", "border-dark", "border-2");
}

// DISPLAY ERROR
function outputError(error) {
    let par = document.getElementById("output");
    par.innerText = error.message;
    par.classList.add("border-bottom", "border-dark", "border-2", "bg-danger", "text-white", "error-message");
    throw error;
}

function playAudio() {
    let audio = document.getElementById("audio");
    audio.play();
}

// DISPLAY ERROR POPUP
// FIRST, RESET IT, SO THAT THE POPUP REAPPEARS EVERY TIME YOU INPUT THE WRONG FORMAT


function displayPopup() {
    let popupDiv = document.querySelector(".popup");
    let popup = document.querySelector("#justinian");
    popup.style.display = "inline-block";
    popup.style.visibility = "visible";
    popup.style.animation = "fadeIn 4s linear forwards";
    popupDiv.style.display = "inline-block";
    popupDiv.style.visibility = "visible";
    popupDiv.style.animation = "fadeIn 4s linear forwards";
    popup.classList.toggle("noneHidden");
    popupDiv.classList.toggle("noneHidden");
    popup.classList.toggle("fadeInOut");
    popupDiv.classList.toggle("fadeInOut");
    console.log("Function executed")

}

// GET USER INPUT
const getUserInput = function (ev) {
    let num = document.querySelector("form").elements[0].value;
    num = Number(num);
    console.log(`This is the current user input: ${num}.\nIts data type is ${typeof num}.`)
    return num;
}

// THE FUNCTION TO EXECUTE ALL FUNCTIONS

function convertAndDisplay() {
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
const init = function () {
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
    let container = document.getElementById("quotewrapper");
    container.classList.add("p-5")
    authorName.classList.toggle("p-2");
    let authorPic = document.getElementById("author-picture");
    authorPic.setAttribute("src", `./images/authors/${quotes[ind].id}-${quotes[ind].author.toLowerCase().split(" ").join("-")}.jpg`)
    authorName.innerText = quotes[ind].author;
    quoteElement.innerText = quotes[ind].quote;

}

// INVOKE FUNCTIONS
let quotes = await getQuotes();
updateQuote(quotes);
setInterval(updateQuote, 12000)

// QUOTE GENERATOR CODE [end]

// RETRIEVE ALL QUOTES AND GENERATE ELEMENTS

const getQuotesUponUserRequest = () => {
    quotesContainerState = true;
    const quotesContainer = document.getElementById("quotes-container");
    quotesContainer.classList.toggle("p-2", "p-2");
    // RESET THE QUOTE CONTAINER SO AS TO NOT DUPLICATE QUOTES UPON CLICKING BUTTON
    quotesContainer.innerHTML = "";
    if (colorMode) {
        quotesContainer.classList.toggle("lightMode");
    } else {
        quotesContainer.classList.toggle("darkMode");
    }
    const idInput = +document.getElementById("quote-id").value;
    const nameInput = document.getElementById("authorName").value

    // CHECK WHETHER USER HAS INPUT ID 
    if (idInput === 0 || !idInput) {
        // IF NOT, CHECK WHETHER USER HAS INPUT AUTHOR NAME
        if (nameInput) {
            quoteByIdGenerated = false;
            allQuotesGenerated = false;
            quoteByAuthorGenerated = true;
            let retrievedQuote = quotes.find(quote => quote.author === nameInput);
        console.log(retrievedQuote);
        quotesContainer.classList.toggle("p-1");
            const newQuoteWrapper = document.createElement("div");
            newQuoteWrapper.classList.toggle("p-3");
            newQuoteWrapper.classList.toggle("m-4");
            newQuoteWrapper.classList.toggle("shadow");
            newQuoteWrapper.classList.toggle("rounded-borders");
            newQuoteWrapper.classList.toggle("lightMode");
            const authorDiv = document.createElement("div");
            const quoteDiv = document.createElement("q");
            authorDiv.innerText = retrievedQuote.author;
            authorDiv.classList.toggle("display-6");
            quoteDiv.innerText = retrievedQuote.quote;
            newQuoteWrapper.appendChild(authorDiv);
            newQuoteWrapper.appendChild(quoteDiv);
            quotesContainer.appendChild(newQuoteWrapper);
    } else {
        // IF NO ID AND AUTHOR, THEN RETRIEVE ALL QUOTES
        quoteByIdGenerated = false;
        allQuotesGenerated = true;
        quoteByAuthorGenerated = false;
        quotes.forEach(quote => {
            const newQuoteWrapper = document.createElement("div");
            newQuoteWrapper.classList.toggle("p-3");
            newQuoteWrapper.classList.toggle("m-4");
            newQuoteWrapper.classList.toggle("shadow");
            newQuoteWrapper.classList.toggle("rounded-borders");
            newQuoteWrapper.classList.toggle("lightMode");
            const authorDiv = document.createElement("div");
            const quoteDiv = document.createElement("q");
            authorDiv.innerText = quote.author;
            authorDiv.classList.toggle("display-6");
            quoteDiv.innerText = quote.quote;
            newQuoteWrapper.appendChild(authorDiv);
            newQuoteWrapper.appendChild(quoteDiv);
            quotesContainer.appendChild(newQuoteWrapper);
        })};
    } else {
        // IF USER HAS INPUT ID, RETRIEVE QUOTE BY ID
        quoteByIdGenerated = true;
        allQuotesGenerated = false;
        quoteByAuthorGenerated = false;
        let retrievedQuote = quotes.find(quote => quote.id === idInput);
        console.log(retrievedQuote);
        quotesContainer.classList.toggle("p-1");
            const newQuoteWrapper = document.createElement("div");
            newQuoteWrapper.classList.toggle("p-3");
            newQuoteWrapper.classList.toggle("m-4");
            newQuoteWrapper.classList.toggle("shadow");
            newQuoteWrapper.classList.toggle("rounded-borders");
            if (colorMode) {
                quotesContainer.classList.toggle("lightMode");

                newQuoteWrapper.classList.toggle("lightMode");
            } else {
                newQuoteWrapper.classList.toggle("darkMode");
                newQuoteWrapper.classList.toggle("border");
                newQuoteWrapper.classList.toggle("border-light");
                quotesContainer.classList.toggle("darkMode");
                quotesContainer.classList.toggle("border");
                quotesContainer.classList.toggle("border-light");
            }
      
            const authorDiv = document.createElement("div");
            const quoteDiv = document.createElement("q");
            authorDiv.innerText = retrievedQuote.author;
            authorDiv.classList.toggle("display-6");
            quoteDiv.innerText = retrievedQuote.quote;
            newQuoteWrapper.appendChild(authorDiv);
            newQuoteWrapper.appendChild(quoteDiv);
            quotesContainer.appendChild(newQuoteWrapper);
    }
}


function activateQuoteRequestInput() {
    const quoteButton = document.getElementById("quote-button");
    quoteButton.addEventListener("click", getQuotesUponUserRequest);
}

activateQuoteRequestInput()

// LIGHT/DARK MODE 


const toggleMode = () => {
    if (colorMode) {
        colorMode = false;
        modePicture.setAttribute("src", "images/sun-color.svg")
        document.body.style.backgroundImage = "url('../images/bw-1.jpg')";
    } else {
        colorMode = true;
        modePicture.src = "images/sun-warm.svg";
        document.body.style.backgroundImage = "url('../images/bw-2.jpg')";
    }

    let navbar = document.querySelector("nav");
    let input = document.querySelector("#input");
    let output = document.querySelector("#output-area");
    let buttonSend = document.querySelector("#button-send");
    let spanOutput = document.querySelector("#spanOutput");
    let quoteWrapper = document.querySelector("#quotewrapper");
    let quoteButton = document.querySelector("#quote-button");
    let inputNumber = document.querySelector("#input-number");
    let quoteId = document.querySelector("#quote-id");
    let authorId = document.querySelector("#authorName");
    let quotesContainer = document.querySelector("#quotes-container");
    console.log(quotesContainer);
    const source = modePicture.src;

    // if (/color/.test(source)) {
    //     modePicture.src = "images/sun-warm.svg";
    //     document.body.style.backgroundImage = "url('../images/bw-2.jpg')";
    // } else {
    //     modePicture.setAttribute("src", "images/sun-color.svg")
    //     document.body.style.backgroundImage = "url('../images/bw-1.jpg')";
    // }



        navbar.classList.toggle("lightMode");
        navbar.classList.toggle("darkMode");
        input.classList.toggle("lightMode");
        input.classList.toggle("darkMode");
        input.classList.toggle("border-light");
        input.classList.toggle("border");
        output.classList.toggle("lightMode");
        output.classList.toggle("darkMode");
        output.classList.toggle("border");
        output.classList.toggle("border-light");
        buttonSend.classList.toggle("lightMode");
        buttonSend.classList.toggle("darkMode");
        buttonSend.classList.toggle("border-light");
        spanOutput.classList.toggle("border-dark");
        spanOutput.classList.toggle("border-light");
        quoteWrapper.classList.toggle("lightMode");
        quoteWrapper.classList.toggle("darkMode");
        quoteWrapper.classList.toggle("border");
        quoteWrapper.classList.toggle("border-light");
        quoteButton.classList.toggle("lightMode");
        quoteButton.classList.toggle("darkMode");
        quoteButton.classList.toggle("border");
        quoteButton.classList.toggle("border-light");
        inputNumber.classList.toggle("lightMode");
        inputNumber.classList.toggle("darkMode");
        inputNumber.classList.toggle("placeholderColor");
        inputNumber.classList.toggle("border");
        inputNumber.classList.toggle("border-light");
        quoteId.classList.toggle("lightMode");
        quoteId.classList.toggle("darkMode");
        quoteId.classList.toggle("placeholderColor");
        quoteId.classList.toggle("border");
        quoteId.classList.toggle("border-light");
        authorId.classList.toggle("lightMode");
        authorId.classList.toggle("darkMode");
        authorId.classList.toggle("placeholderColor");
        authorId.classList.toggle("border");
        authorId.classList.toggle("border-light");


        let allQuotes = quotesContainer.children;
        console.log("These are all the quotes:", allQuotes, "Plus one", allQuotes[0])
        if (allQuotes.length) {
            quotesContainer.classList.toggle("darkMode");
            quotesContainer.classList.toggle("lightMode");
            quotesContainer.classList.toggle("border");
            quotesContainer.classList.toggle("border-light");
           for (let i = 0; i < allQuotes.length; i++) {
            allQuotes[i].classList.toggle("lightMode");
            allQuotes[i].classList.toggle("darkMode");
            allQuotes[i].classList.toggle("border");
            allQuotes[i].classList.toggle("border-light");
           }
        } 
    
}

const modePicture = document.querySelector("#mode");
modePicture.addEventListener("click", toggleMode);


export { getUserInput, convertToRoman, updateQuote, getRandomInt, outputRomanNumeral }