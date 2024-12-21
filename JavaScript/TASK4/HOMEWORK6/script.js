console.log("Connected")
function fullnames(firstnames, lastnames) {
    let fullnames = [];
    const minLength = Math.min(firstnames.length, lastnames.length);

    let index = 0; 
    for (const firstname of firstnames) {
        if (index < minLength) {
            fullnames.push(`${firstname} ${lastnames[index]}`);
        }
        index++;
    }

    return fullnames;
}

let firstnames = ["Zoran", "Marko", "Bojan", ];
let lastnames = ["Nakov", "Markov", "Bojanov", "Ivanov"];

console.log(fullnames(firstnames, lastnames));
