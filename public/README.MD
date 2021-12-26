# Roman numeral converter and quote generator

 [Visit here](https://antonio-riccelli.github.io/js-roman-numeral-converter/)

 ---

## Description

A Roman numeral converter accompanied by a series of quotes from Roman authors.

## Tech

- HTML
- CSS
- TailwindCSS
- JavaScript

## Other tools and packages

- NPM
- gh-pages
- autoprefixer
- purgecss

 #### How I approached the conversion algorithm:

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

 #### Other key learnings
 - Before starting this project, I had neither ever used NPM nor handled packages or dependencies. I'm definitely not proficient with them, but I now have an understanding of how to install them, modify settings in the related JSON config files, running some personalised scripts etc.
 - I have familiarised myself with some use of Node.JS, Javascript modules and the import/export syntax
 - Understanding of the difference between src and dist folders
 - Experimented with TailwindCSS framework
----


 