
function Institution(location, capacity) {
    this.id = Math.floor(Math.random() * 1000);
    this.location = location;
    this.capacity = capacity;

    this.validateCapacity = function () {
        if (this.capacity < 1) {
            throw new Error(`Invalid capacity: ${this.capacity}. Capacity must be at least 1.`);
        }
    };
}

function Course(description, price) {
    this.id = Math.floor(Math.random() * 1000);                                     //ovde proguglav za random NUMBER  a isto ima za UNIQUE ID so UUID.randomUUID() no togas mislam ke e fiksen
    this.description = description;
    this.price = price;

    this.validatePrice = function () {
        if (this.price < 0) {
            throw new Error(`Invalid price: ${this.price}. Price cannot be negative.`);
        }
        this.price = `${price} €`;
    };
    this.validatePrice(price)
}

function Person(email, phone) {
    this.id = Math.floor(Math.random() * 1000);                          // isto i ovde so math.random radi random number isto mozese so get date() ili Date.now() + Math.random()
    this.email = email;
    this.phone = phone;

    this.validateEmail = function () {
        if (!this.email.includes('@')) {
            throw new Error(`Invalid email: ${this.email}. Email must contain '@'.`);
        }
    };
}


function Academy(name, startDate, endDate, location, capacity) {
    Object.setPrototypeOf(this, new Institution(location, capacity));
    this.name = name;
    this.startDate = startDate; 
    this.endDate = endDate; 
    this.subjects = []; 

    this.getNumberOfClasses = function () {
        return this.subjects.length * 10;
    };

    this.PrintStudents = function (students) {
        students.forEach((student) => console.log(student));
    };

    this.PrintSubjects = function (subjects) {
        subjects.forEach((subject) => console.log(subject));
    };
}


function Subject(title, isElective, description, price) {
    Object.setPrototypeOf(this, new Course(description, price));
    this.title = title;
    this.isElective = isElective;
    this.numberOfClasses = 10; 

    this.overrideClasses = function (number) {
        if (number < 3) {
            console.error('Number of classes cannot be smaller than 3.');
            return;
        }
        this.numberOfClasses = number;
    };
}


function Student(firstName, lastName, age, email, phone) {
    Object.setPrototypeOf(this, new Person(email, phone));
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.completedSubjects = []; 
    this.academy = null; 
    this.currentSubject = null; 

    this.startAcademy = function (academy) {
        this.academy = academy;
    };

    this.startSubject = function (subject) {
        if (!this.academy) {
            console.error('Student is not enrolled in any academy.');
            return;
        }
        this.currentSubject = subject;
    };
}

const academy = new Academy('QINSHIFT', '10-01-2024', '10-01-2025', 'Skopje', 100);
const  subject = new Subject('JavaScript', false, 'Advanced JavaScript', 2500);
const student = new Student('Zoran', 'Nakov', 25, 'nakovzoran99@gmail.com', '000-000-000'); 
console.log(academy);
console.log(subject);
console.log(student);




try {
    academy.validateCapacity(); 
    subject.validatePrice(); 
    student.validateEmail(); 
} catch (error) {
    console.error(error.message); 
}






