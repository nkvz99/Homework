    // let zodiacSigns = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
    // let yearOfBirth = prompt("Enter your year of birth to find your Chinese Zodiac Sign:");
    // let calculation = (yearOfBirth - 4) % 12;
    // let zodiacSign = zodiacSigns [calculation]
    // alert(`Your Chinese Zodiac Sign is: ${zodiacSign}`);
    // console.log(`Your Chinese Zodiac Sign is: ${zodiacSign}`);


    
// ELSE IF

let BirthYear = prompt ("Enter your year of birth to find your Chinese Zodiac Sign:")
let calculation = (BirthYear - 4) % 12;
if (calculation === 0) {
    alert("Your Chinese Zodiac Sign is Rat");
} else if (calculation === 1) {
    alert("Your Chinese Zodiac Sign is Ox");
} else if (calculation === 2) {
    alert("Your Chinese Zodiac Sign is Tiger");
} else if (calculation === 3) {
    alert("Your Chinese Zodiac Sign is Rabbit");
} else if (calculation === 4) {
    alert("Your Chinese Zodiac Sign is Dragon");
} else if (calculation === 5) {
    alert("Your Chinese Zodiac Sign is Snake");
} else if (calculation === 6) {
    alert("Your Chinese Zodiac Sign is Horse");
} else if (calculation === 7) {
    alert("Your Chinese Zodiac Sign is Goat");
} else if (calculation === 8) {
    alert("Your Chinese Zodiac Sign is Monkey");
} else if (calculation === 9) {
    alert("Your Chinese Zodiac Sign is Rooster");
} else if (calculation === 10) {
    alert("Your Chinese Zodiac Sign is Dog");
} else if (calculation === 11) {
    alert("Your Chinese Zodiac Sign is Pig");
}