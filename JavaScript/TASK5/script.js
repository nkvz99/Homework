console.log("Connected")

function Animal(name, kind) {
    let animal = []; 

    animal.name = name;
    animal.kind = kind;

    animal.speak = function(message) {
        console.log(`${this.kind} ${this.name} says: '${message}'`);
    };

    return animal
}

let dog = Animal("Sharko", "Dog");
dog.speak("Hey bro!!!"); 

let cat = Animal("Lusi" , "Cat")
cat.speak("Mjauuuu")