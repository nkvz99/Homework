console.log("Connected");

// FUNCTION FOR BOTH


// function Dog_HumanConverter(year, sortof) {
//     if (Number.isNaN(year)) {
//         alert ('Please enter age in numbers');
//     }
//      else if (sortof === "HumanYears") {
//         let DogYears = year * 7;
//         return `Your ${sortof} years are equal to ${DogYears} in dog years.`;
//     } else if (sortof === "DogYears") {
//         HumanYears = year / 7;
//         return `Your ${sortof} years are equal to ${HumanYears} in human years.`; 
//     } else{
//         alert (`${sortof} is not correct`)
//     }
// }

// let HumanYears = parseInt(prompt('Enter your age'));
// console.log(Dog_HumanConverter(Number(HumanYears), "HumanYears"));
// let DogYears = parseInt(prompt('Enter your dogs age'));
// console.log(Dog_HumanConverter(Number(DogYears), "DogYears"));

// SEPARATE FUNCTION
//    HUMAN CONVERTER

function HumanConverter(year, sortof) {
    if (Number.isNaN(year)) {
        alert ('Please enter age in numbers');

    } else if (sortof === "HumanYears") {  
        let DogYears = year * 7;
        return `Your ${sortof} years are equal to ${DogYears} in dog years.`;
    } else {
        alert (`${sortof} is not correct`)
    }
}
let HumanYears = parseInt(prompt('Enter your age'));
console.log(HumanConverter(Number(HumanYears), "HumanYears"));

// DOG CONVERTER

function DogConverter(year, sortof) {
    if (Number.isNaN(year)) {
        alert ('Please enter Dog age in numbers');

    } else if  (sortof === "DogYears") {
        let HumanYears = year / 7;
        return `Your ${sortof} years are equal to ${HumanYears} in human years.`;

    } else {
        alert (`${sortof} is not correct`)
    }
}
let DogYears = parseInt(prompt('Enter your dogs age'));
console.log(DogConverter(Number(DogYears), "DogYears"));


