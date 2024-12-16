console.log("Connected")

// function Animal(name, kind) {
//     let animal = []; 

//     animal.name = name;
//     animal.kind = kind;

//     animal.speak = function(message) {
//         console.log(`${this.kind} ${this.name} says: '${message}'`);
//     };

//     return animal
// }

// let dog = Animal("Sharko", "Dog");
// dog.speak("Hey bro!!!"); 

// let cat = Animal("Lusi" , "Cat")
// cat.speak("Mjauuuu")



// PRVIOT PRIMER PRED PREDAVANJETO STO SAM GO IZGUGLAV A VTORIOT E POSLE POSLEDNIOV CAS.
// DOKOLKU MOZE SAMO OVDE KOJ E POPRAKTICEN PRIMER ZA KORISTENJE I ZOSTO VI BLAGODARAM.



function Animal2(name, kind){
    this.name = name;
    this.kind = kind;
    this.speak = function(message){
        console.log(`${this.kind} ${this.name} says '${message}'`);

    } 
    
}
let dog = new Animal2("Sharko" , "Dog");
dog.speak("Hey bro!!!")

let cat = new Animal2("Lusi" , "Cat");
cat.speak("Mjauuuu")

