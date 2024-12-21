console.log("Connected");

let numbers = [2, 4, 5, 232, 23, 22, "asd", 24];
let numberList = document.getElementById("numberList");
let sum = 0;
let equation = "";

for (let i = 0; i < numbers.length; i++) {
    if (typeof numbers[i] === 'number') {
        numberList.innerHTML += `<li>${numbers[i]}</li>`;
        sum += numbers[i];
        if (equation === "") {
            equation = `${numbers[i]}`; 
        } else {
            equation += ` + ${numbers[i]}`;  
        }
    }
}
equation += ` = ${sum}`;
document.getElementById("sum").textContent = `The sum is: ${sum}`;
document.getElementById("equation").textContent = `Mathematical Equation: ${equation}`;


