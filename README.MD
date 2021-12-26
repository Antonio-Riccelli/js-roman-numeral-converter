# Roman numeral converter and quote generator

![Page demo](/public/images/demo.gif)

 ---

## Description
A full-stack app consisting of a Roman Numeral Converter and a random quote generator.

The user can input the standard number and immediately obtain the output in Roman numerals. Meanwhile, beneath the input form, different quotes from Roman authors, accompanied by author's name and picture, are displayed.

The quotes are stored in a Postgres database hosted on Heroku and are retrieved via an API fetch call. This starts a GET request through the server that returns the array of quotes, which is then iterated randomly.

---

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


 