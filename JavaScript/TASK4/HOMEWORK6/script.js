console.log("Connected")
function fullnames(firstnames, lastnames) {
    let fullnames = [];

    for (let i = 0; i < firstnames.length; i++) {
        fullnames.push(firstnames[i] + " " + lastnames[i]);
    }

    return fullnames;
}

let first = ["Zoran", "Marko" , "Bojan"];
let last = ["Nakov" , "Markov" , "Bojanov"];

console.log(fullnames(first , last));  
