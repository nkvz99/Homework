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

// Note: Samo ne uspeav da napravam da funkcionira na sledniot nacin: Dokolku koga prvo vnesuvame nesto sto ne e broj.
//  kaj prviot obid za presmetuvanje od godini vo kuceski godini mi dava prompt za vnesuvanje godini za da presmeta vo kuceski,
// no potoa me prefrla pravo kaj vtoriot prompt za da presmeta kuceski godini vo godini , a sakav da mi se vrati kaj prviot obid da ne vleze vo naredniot uslov dali ima nekakva moznost za toa?

