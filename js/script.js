const romanNumerals = [{
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX"
},

{
    1: "X",
    2: "XX",
    3: "XXX",
    4: "XL",
    5: "L",
    6: "LX",
    7: "LXX",
    8: "LXXX",
    9: "XC"
},

{
    1: "C",
    2: "CC",
    3: "CCC",
    4: "CD",
    5: "D",
    6: "DC",
    7: "DCC",
    8: "DCCC",
    9: "CM"
},

{
    1: "M",
    2: "MM",
    3: "MMM",
    4: "MMMM",
    5: "MMMMM"
}
];

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
    return convertedNumber.join("");
}