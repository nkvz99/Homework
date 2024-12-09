console.log("connected");

// let BirthYear = parseInt(prompt("Enter your birthday"));
// console.log(CalculateAge(Number(BirthYear) , "BirthYear"));

// function CalculateAge(BirthYear, CurrentYear) {
//     if (Number.isNaN (BirthYear) || BirthYear > CurrentYear) {
//         alert('Invalid birth year entered. Please try again')
//         console.log("Invalid birth year entered. Please try again")
//     } else {
//         let age = CurrentYear - BirthYear;
//         if (age === 0) {
//             console.log("You were born this year!")
//         } 
//         else {
//             console.log(`You are ${age} years old.`)
//         }
//     }
// }
// // let CurrentTime = new Date();
// // let CurrentYear = CurrentTime().getFullYear();
// // console.log(CalculateAge(Number(CurrentYear), "CurrentYear"));
// // let BirthYear = parseInt(prompt("Enter your birthday"));


// CalculateAge(1998,2024)
// CalculateAge(1999,2024)
// CalculateAge(1997,2024)

function calculateAge () {
    let birthYear = parseInt(prompt('Enter your year of birth'));
    let curretYear = 2024;
    let year = curretYear - birthYear;
    if (Number.isNaN (birthYear)){
        alert ('You entered an invalid number.');
    }else { 
        alert(`your age is: ${year}`);
     }
    }
calculateAge ()

