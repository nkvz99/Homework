console.log("Connected");



function HumanConverter(year, sortof) {
    if (Number.isNaN(year)) {
        alert('Please enter the age in numbers.');
        let newtry = parseInt(prompt('Please enter the age as a number'), 10);
        return HumanConverter(newtry); 
    }
    else if (sortof === "HumanToDog") {
        let DogYears = year * 7;
        return `Your ${year} human years are equal to ${DogYears} in dog years.`;
    } else if (sortof === "DogToHuman") {
        let HumanYears = year / 7;
        return `Your ${year} dog years are equal to ${HumanYears} in human years.`;
    } else {
        return `${sortof} is not a valid conversion type. Please enter either "HumanToDog" or "DogToHuman".`;
    }
}

let age = parseInt(prompt('Enter the age (in years):'));
let converter = prompt('Enter the conversion type ("HumanToDog" or "DogToHuman"):');
let result = HumanConverter(age, converter);
alert(result);

