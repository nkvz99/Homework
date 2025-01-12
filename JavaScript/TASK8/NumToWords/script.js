console.log("Connected");
let textNumbers = document.getElementById("numbers");
let textWords = document.getElementById("words");
let errorMessage = document.getElementById("error");

textNumbers.addEventListener("input", (e) => {
    let value = e.target.value;
    if (isNaN(value) || value === "") {
        errorMessage.textContent = "Please enter only numbers.";
        textWords.value = "";
    } else {
        errorMessage.textContent = "";
        textWords.value = convert(Number(value));
    }
});

function convert(number) {
    if (isNaN(number) || number < 0 || number > 100000000) {
        errorMessage.textContent = "Please enter a number between 0 to 100,000,000.";
        return "";
    }
    if (number === 0) return "zero";
    if (number === 100000000) return "one hundred million";

    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    let words = "";

    const addWords = (value, unit) => {
        if (value > 0) words += `${convert(value)} ${unit} `;
    };

    addWords(Math.floor(number / 1000000), "million");
    number %= 1000000;
    addWords(Math.floor(number / 1000), "thousand");
    number %= 1000;
    addWords(Math.floor(number / 100), "hundred");
    number %= 100;

    if (number >= 20) {
        words += `${tens[Math.floor(number / 10)]}`;
        if (number % 10 > 0) words += `-${ones[number % 10]}`;
    } else if (number >= 10) {
        words += teens[number - 10];
    } else if (number > 0) {
        words += ones[number];
    }

    return words.trim();
}

