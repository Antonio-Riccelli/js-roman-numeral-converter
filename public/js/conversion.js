import romanNumerals from "./numerals.js";

export default function convertToRoman(num) {
    let convertedNumber = [];
    let arrFromNum = [...num.toString()].reverse();
    for (let i = 0; i < arrFromNum.length; i++) {
        if (arrFromNum[i] === 0) {
            continue;
        } else {
            convertedNumber.unshift(romanNumerals[i][arrFromNum[i]]);
        }
    }
return convertedNumber.join("");
}