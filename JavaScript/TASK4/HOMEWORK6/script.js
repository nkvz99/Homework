console.log("Connected")
function fullnames(firstnames, lastnames) {
    let fullnames = [];

    for (let i = 0; i < firstnames.length; i++) {
        fullnames.push(firstnames[i] + " " + lastnames[i]);
    }

    return fullnames;
}

let firstnames = ["Zoran", "Marko" , "Bojan"];
let lastnames = ["Nakov" , "Markov" , "Bojanov"];

console.log(fullnames(firstnames , lastnames));  
