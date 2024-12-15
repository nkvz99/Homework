console.log("Connected")
function sumofmaxandmin(array) {
    if (array.length === 0) {
        return "Array is empty.";
    }

    let max = Math.max(...array); 
    let min = Math.min(...array); 
    let sum = max + min; 

    return `Max: ${max}, Min: ${min}, Sum: ${sum}`;
}



let sum1 = sumofmaxandmin([10 , 20 , 30 , 40 ,50])
console.log(sum1)

