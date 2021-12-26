import romanNumerals from "./numerals";
// import { convertToRoman } from "./script";

/* The original function included some stricly frontend parts, which would cause the Jest tests to fail, unless I change test environment to JsDom. As I will test the Frontend separately, I deemed that unnecessary and included the function here, minus the frontend bit.
*/


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

describe("Testing the Roman numeral conversion algorithm", () => {
    test("455 should return CDLV", () => {
        // ARRANGE
        const arabicNumber = 455;
        const expected = 'CDLV';
        // ACT
        const actual = convertToRoman(arabicNumber);
        // ASSERT
        expect(actual).toBe(expected);
    });

    test("5 should return V", () => {
        // ARRANGE
        const arabicNumber = 5;
        const expected = 'V';
        // ACT
        const actual = convertToRoman(arabicNumber);
        // ASSERT
        expect(actual).toBe(expected);
    });

    test("1000 should return M", () => {
        // ARRANGE
        const arabicNumber = 1000;
        const expected = "M";
        // ACT
        const actual = convertToRoman(arabicNumber);
        // ASSERT
        expect(actual).toBe(expected);
    });

    test("3457 should return MMMCDLVII", () => {
        // ARRANGE
        const arabicNumber = 3457;
        const expected = "MMMCDLVII";
        // ACT
        const actual = convertToRoman(arabicNumber);
        // ASSERT
        expect(actual).toBe(expected);
    });

    test("0 should return an error", () => {
        // ARRANGE 
        const arabicNumber = 0;
        const expected = new Error("Please enter a valid number");
        // ACT
        const actual = convertToRoman(arabicNumber);
        // ASSERT
        expect(actual).toBe(expected);
    })
});