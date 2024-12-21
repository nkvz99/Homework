console.log("Connected");

let numbers =[2,4,5,232,23,22];
let numberList = document.getElementById("numberList")
let sum = 0;
let equation = "";

for (let i = 0; i < numbers.length; i++) {
    numberList.innerHTML += `<li>${numbers[i]}</li>`;
    sum += numbers[i];
    if (i === 0) {
        equation = numbers[i];
    } else {
        equation += ' + ' + numbers[i];
    }
    
}
equation += `=${sum}`
document.getElementById("sum").textContent = `The sum is: ${sum}`;
document.getElementById("equation").textContent = `Mathematical Equation: ${equation}`;

