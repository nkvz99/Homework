let zodiacSigns = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
let yearOfBirth = prompt("Enter your year of birth to find your Chinese Zodiac Sign:");
let calculation = (yearOfBirth - 4) % 12;
let zodiacSign = zodiacSigns [calculation]
alert(`Your Chinese Zodiac Sign is: ${zodiacSign}`);
console.log(`Your Chinese Zodiac Sign is: ${zodiacSign}`);