console.log("Connected")

function sumNumbers(numbers){
    let number = 0;
    for (let i= 0; i < numbers.length; i++){
        number += numbers[i];
    }
    return number;

}


let numbers1 = sumNumbers([3 , 3 , 3 , 3 , 3])
console.log(numbers1)

let numbers2 = sumNumbers([5 , 5 , 5 , 5 ,5])
console.log(numbers2)
