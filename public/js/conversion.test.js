import romanNumerals from "./numerals";
import convertToRoman from "./conversion";

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

    test("0 should not return an empty output", () => {
        // ARRANGE 
        const arabicNumber = 0;
        const expected = "";
        // ACT
        const actual = convertToRoman(arabicNumber);
        // ASSERT
        expect(actual).toBe(expected);
    })
});