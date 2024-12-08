console.log("connected");



function CalculateAge(BirthYear, CurrentYear) {
    if (Number.isNaN(BirthYear) || BirthYear > CurrentYear) {
        alert('Invalid birth year entered. Please try again')
        console.log("Invalid birth year entered. Please try again")
    } else {
        let age = CurrentYear - BirthYear;
        if (age === 0) {
            console.log("You were born this year!")
        } else if (age === 1) {
            console.log("You are 1 year old.");
        }
        else {
            console.log(`You are ${age} years old.`)
        }
    }
}

let BirthYear = parseInt(prompt("Enter your birth year:"));
console.log(CalculateAge(Number(BirthYear), "BirthYear"))
let CurrentYear = new Date().getFullYear();
console.log(CalculateAge(Number(CurrentYear), "CurrentYear"));

// ovde nikako ne mozam da se snajdam vo ovaa zadaca 