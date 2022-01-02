import romanNumerals from "./numerals.js";
import convertToRoman from "./conversion.js";

let colorMode = true;
let quotesContainerState = false;
let quoteByIdGenerated = false;
let allQuotesGenerated = false;
let quoteByAuthorGenerated = false;

const quotesContainer = document.getElementById("quotes-container");
let par = document.getElementById("output");

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
    // let par = document.getElementById("output");
    par.classList.remove("bg-danger", "text-white", "error-message");
     par.innerText = roman;
    par.classList.add("border-bottom",  "border-2");
    if (colorMode) {
        par.classList.add("border-dark");
    } else {
        par.classList.add("border-light");
    }
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

    // RESET THE QUOTE CONTAINER SO AS TO NOT DUPLICATE QUOTES UPON CLICKING BUTTON
    quotesContainer.innerHTML = "";
    quotesContainerState = true;
    const idInput = +document.getElementById("quote-id").value;
    const nameInput = document.getElementById("authorName").value

    // CHECK WHETHER USER HAS INPUT ID 
    if (idInput === 0 || !idInput) {
        // IF NOT, CHECK WHETHER USER HAS INPUT AUTHOR NAME
        if (nameInput) {
            // console.log(nameInput, typeof nameInput);
            let authorName = nameInput.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
            console.log(authorName);
            let regexp = new RegExp(authorName, "ig");
            console.log(regexp)
            let retrievedQuote = quotes.filter(quote => regexp.test(quote.author));
            console.log("Here are the retrieved quotes", retrievedQuote, Array.isArray(retrievedQuote));
            retrievedQuote.forEach(q => {
            quotesContainer.classList.add("p-2");
            const newQuoteWrapper = document.createElement("div");
            newQuoteWrapper.classList.add("p-3");
            newQuoteWrapper.classList.add("m-4");
            newQuoteWrapper.classList.add("shadow");
            newQuoteWrapper.classList.add("rounded-borders");
            if (colorMode) {
                newQuoteWrapper.classList.add("lightMode");
                newQuoteWrapper.classList.remove("darkMode");
                quotesContainer.classList.add("lightMode");
                quotesContainer.classList.remove("darkMode", "border", "border-light");
            } else {
                newQuoteWrapper.classList.add("darkMode", "border", "border-light");
                newQuoteWrapper.classList.remove("lightMode");
                quotesContainer.classList.remove("lightMode");
                quotesContainer.classList.add("darkMode", "border", "border-light");
            }
            
            const authorDiv = document.createElement("div");
            const quoteDiv = document.createElement("q");
            authorDiv.innerText = q.author;
            authorDiv.classList.add("display-6");
            quoteDiv.innerText = q.quote;
            newQuoteWrapper.appendChild(authorDiv);
            newQuoteWrapper.appendChild(quoteDiv);
            quotesContainer.appendChild(newQuoteWrapper);
            })

        // quotesContainer.classList.add("p-1");
        //     const newQuoteWrapper = document.createElement("div");
        //     newQuoteWrapper.classList.add("p-3");
        //     newQuoteWrapper.classList.add("m-4");
        //     newQuoteWrapper.classList.add("shadow");
        //     newQuoteWrapper.classList.add("rounded-borders");
        //     if (colorMode) {
        //         newQuoteWrapper.classList.add("lightMode");
        //         newQuoteWrapper.classList.remove("darkMode");
        //     } else {
        //         newQuoteWrapper.classList.add("darkMode", "border", "border-light");
        //         newQuoteWrapper.classList.remove("lightMode");
        //     }
            
        //     const authorDiv = document.createElement("div");
        //     const quoteDiv = document.createElement("q");
        //     authorDiv.innerText = retrievedQuote.author;
        //     authorDiv.classList.add("display-6");
        //     quoteDiv.innerText = retrievedQuote.quote;
        //     newQuoteWrapper.appendChild(authorDiv);
        //     newQuoteWrapper.appendChild(quoteDiv);
        //     quotesContainer.appendChild(newQuoteWrapper);
    } else {
        // IF NO ID AND AUTHOR, THEN RETRIEVE ALL QUOTES
        quotes.forEach(quote => {
            const newQuoteWrapper = document.createElement("div");
            newQuoteWrapper.classList.toggle("p-3");
            newQuoteWrapper.classList.toggle("m-4");
            newQuoteWrapper.classList.toggle("shadow");
            newQuoteWrapper.classList.toggle("rounded-borders");
            quotesContainer.classList.add("p-2");
            if (colorMode) {
                newQuoteWrapper.classList.add("lightMode");
                newQuoteWrapper.classList.remove("darkMode");
                quotesContainer.classList.add("lightMode");
                quotesContainer.classList.remove("darkMode");
            } else {
                newQuoteWrapper.classList.remove("lightMode");
                newQuoteWrapper.classList.add("darkMode", "border", "border-light");
                quotesContainer.classList.add("darkMode", "border","border-light");
                quotesContainer.classList.remove("lightMode");
            }
            
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
        let retrievedQuote = quotes.find(quote => quote.id === idInput);
        quotesContainer.classList.toggle("p-1");
            const newQuoteWrapper = document.createElement("div");
            newQuoteWrapper.classList.toggle("p-3");
            newQuoteWrapper.classList.toggle("m-4");
            newQuoteWrapper.classList.toggle("shadow");
            newQuoteWrapper.classList.toggle("rounded-borders");
            if (colorMode) {
                quotesContainer.classList.add("lightMode");
                quotesContainer.classList.remove("darkMode");
                newQuoteWrapper.classList.add("lightMode");
                newQuoteWrapper.classList.remove("darkMode");
            } else {
                newQuoteWrapper.classList.add("darkMode", "border", "border-light");
                newQuoteWrapper.classList.remove("lightMode");
                quotesContainer.classList.remove("lightMode");
                quotesContainer.classList.add("darkMode", "border", "border-light");
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

// SWITCH FUNCTION
const toggleMode = () => {
    let allQuotes = quotesContainer.children;
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
    const source = modePicture.src;

    // FROM LIGHT TO DARK
    if (colorMode) {
        colorMode = false;
        modePicture.setAttribute("src", "images/sun-color.svg")
        document.body.style.backgroundImage = "url('../images/bw-1.jpg')";
        par.classList.remove("border-dark");
        par.classList.add("border-light");
        navbar.classList.remove("lightMode");
        navbar.classList.add("darkMode");
        input.classList.add("darkMode", "border", "border-light");
        input.classList.remove("lightMode");
        output.classList.add("darkMode", "border", "border-light");
        output.classList.remove("lightMode");
        buttonSend.classList.add("darkMode", "border-light");
        buttonSend.classList.remove("lightMode");
        spanOutput.classList.add("border-light");
        spanOutput.classList.remove("border-dark");
        quoteWrapper.classList.remove("lightMode");
        quoteWrapper.classList.add("darkMode", "border", "border-light");
        quoteButton.classList.add("darkMode", "border", "border-light");
        quoteButton.classList.remove("lightMode");
        inputNumber.classList.add("darkMode", "border", "border-light", "placeholderColor");
        inputNumber.classList.remove("lightMode");
        quoteId.classList.add("darkMode", "border", "border-light", "placeholderColor");
        quoteId.classList.remove("lightMode");
        authorId.classList.add("darkMode", "placeholderColor", "border", "border-light");
        authorId.classList.remove("lightMode");

        if (allQuotes.length) {
            quotesContainer.classList.add("darkMode");
            quotesContainer.classList.remove("lightMode");
            quotesContainer.classList.add("border");
            quotesContainer.classList.add("border-light");
           for (let i = 0; i < allQuotes.length; i++) {
            allQuotes[i].classList.remove("lightMode");
            allQuotes[i].classList.add("darkMode");
            allQuotes[i].classList.add("border");
            allQuotes[i].classList.add("border-light");
           }
        } 
    } else {
        //FROM DARK TO LIGHT
        colorMode = true;
        modePicture.src = "images/sun-warm.svg";
        document.body.style.backgroundImage = "url('../images/bw-2.jpg')";
        par.classList.add("border-dark");
        par.classList.remove("border-light");
        navbar.classList.add("lightMode");
        navbar.classList.remove("darkMode");
        input.classList.remove("darkMode", "border", "border-light");
        input.classList.add("lightMode");
        output.classList.remove("darkMode", "border", "border-light");
        output.classList.add("lightMode");
        buttonSend.classList.remove("darkMode", "border-light");
        buttonSend.classList.add("lightMode");
        spanOutput.classList.remove("border-light");
        spanOutput.classList.add("border-dark");
        quoteWrapper.classList.add("lightMode");
        quoteWrapper.classList.remove("darkMode", "border", "border-light");
        quoteButton.classList.remove("darkMode", "border", "border-light");
        quoteButton.classList.add("lightMode");
        inputNumber.classList.remove("darkMode", "border", "border-light", "placeholderColor");
        inputNumber.classList.add("lightMode");
        quoteId.classList.remove("darkMode", "border", "border-light", "placeholderColor");
        quoteId.classList.add("lightMode");
        authorId.classList.remove("darkMode", "placeholderColor", "border", "border-light");
        authorId.classList.add("lightMode");

        if (allQuotes.length) {
            quotesContainer.classList.remove("darkMode", "border", "border-light");
            quotesContainer.classList.add("lightMode");
  
           for (let i = 0; i < allQuotes.length; i++) {
            allQuotes[i].classList.add("lightMode");
            allQuotes[i].classList.remove("darkMode", "border", "border-light");
           }
        } 
    }
}

const modePicture = document.querySelector("#mode");
modePicture.addEventListener("click", toggleMode);


export { getUserInput, convertToRoman, updateQuote, getRandomInt, outputRomanNumeral }