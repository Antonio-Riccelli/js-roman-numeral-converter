# Roman numeral converter and quote generator

![Page demo](./public/images/demo4.gif)

 ---

## Description
A full-stack app consisting of a Roman Numeral Converter and a random quote generator.

The user can input the Arabic number and immediately obtain the output in Roman numerals. Meanwhile, beneath the input form, different quotes from Roman authors, accompanied by author's name and picture, are displayed.

The backend is hosted on Heroku, the quotes are stored in a PostgresQL database and retrieved via an API fetch call. This starts a GET request through the server that returns the array of quotes, which is then iterated through randomly.

The frontend is built using vanilla HTML, CSS and JavaScript. Bootstrap has been implemented to streamline styling and layout. 

---

## How to use it

- To convert a number, enter your Arabic numberal in the input section and click **Convert**. The Roman numeral will be displayed in the **Output** section.
![demo](public/images/demo2.jpg)
- To retrieve quotes, use the provided fields. You can: 
  - Leave input fields blank and click the button to get all quotes
  - Find quotes by an ID number
  - Find quotes by author name or any string. The regular expression will find anything that matches the provided string.
![demo](public/images/demo3.jpg)
## Installation

- Clone the repo to your desired folder
- Open your IDE in the project root folder
- run `npm i` to install all dependencies
- Run either the "start" or "dev" scripts to spin up the app

## Tech

- HTML
- CSS
- Bootstrap
- JavaScript
- Node.JS
- PostgreSQL

## Other tools and packages

- [Dotenv](https://www.npmjs.com/package/dotenv)
- [pg](https://www.npmjs.com/package/pg)
- [Jest](https://jestjs.io/)
- [express-generator-esmodules](https://www.npmjs.com/package/express-generator-esmodules)

---
### Project Chronicles

- ##### 26/12/2021
  - I originally started this project over a month ago but had trouble moving forward due to my lack of experience with the backend and Node.JS as a whole. Furthermore, I chose TailwindCSS as a CSS framework which, to this day, I very much dislike.
  - After a few weeks studying with [School of Code](https://www.schoolofcode.co.uk/), I've felt confident to tackle this again. So far, the backend has been set up and seems to be working fine. I have successfully tested this using [Postman API platform](https://www.postman.com/) (I prefer the desktop version) and have been able to populate the database with the initial data. 
  - The frontend is also linked to the backend and working. I am now focusing on the styling whilst familiarising myself with Bootstrap. 

- #### 29/12/2021
  - Added some tests for the conversion algorithm using Jest. As the algorithm wsa initially included in the frontend JS file, I was getting strange errors as Jest was trying to test other bits of code that interacted with the frontend. There was no point in over-complicating things and use things like JSDom, so I moved the conversion algorithm to a separate file and imported it as a module. This way, the tests work just fine. 
  - I have tried adding further tests for the API via Supertest, but I keep getting errors I have been unable to fix, despite the API working just fine. Will keep on chipping at it until it works (or until I post a question on Stackoverflow...)
  - Slightly tweaked the styling to make it look more appealing. Added a collapsable navbar and a slight touch of color. Fixed some size issues with the picture. Getting more familiar with Bootstrap and its model.

- #### 01/01/2022
  - Completed the dark/light mode feature. It also switches the background-image to a more tone-fitting one. The code is not very clean and will need some refactoring.
  - I have tried implementing Typed.JS on the converted number, but it seems to have issues with dynamically generated values, so I've currently put it aside a nice-to-have. 
  - The background image seems to stretch and pixelate when I generated another div to show all the quotes. I haven't spent time trying to fix this, but it's of the next tasks.

- #### 02/01/2022
  - Fixed several bugs with the dark/light mode feature. Looks fine now and there don't seem to be other issues. 
    - Main takeaway: plan your code in advance. All the issues were the result of lack of planning and trying to find too many workarounds on the spot.
  - Added feature to look up quotes by author. User can input a name and/or surname or any string, and a RegExp object will be used to to do the lookup. If both values are populated, it defaults to search by ID as more specific.
  - Fixed some minor layout issues with Bootstrap.

---

 #### Approaching the conversion algorithm:

 - Brush up on how Romans counted to understand the underlying logic, I used [Mathisfun.com/roman-numerals](https://www.mathsisfun.com/roman-numerals.html)
 - Brainstorm ideas in pseudocode.
    - I do this either with pen and paper or an Excel/Word file.
    - I initially came up with potential solutions that were overcomplicated and likely wrong, then I remembered the __KISS__ principle: no, not one of the best rock bands ever, but "__Keep It Simple Stupid__" (read more about it [here](https://en.wikipedia.org/wiki/KISS_principle))
    - Realised I could just store the Roman numerals in an array of objects to be looped through so I chose that approach. The object key is the standard number, whilst its value is the correspondent Roman numeral.
 - Break down the provided number (function argument) in ones, tens, hundreds and thousands, and pass these as elements of a new array.
 - Array is reversed so that I can start looping from the ones
    - The array length will never exceed four (the challenge is structured to test up to 3 or so thousands)
 - Use a loop to iterate through the elements and look up the equivalent Roman number, which is stored in an array of objects
    - Romans did not have a sign for "_zero_", that was introduced by Arabs later on, so the loop continues if it encounters a "0".
 - Add the correspondent number to a new array, which is then joined and converted to a string and returned.

----

### LICENSE

[MIT](https://spdx.org/licenses/MIT.html)
 