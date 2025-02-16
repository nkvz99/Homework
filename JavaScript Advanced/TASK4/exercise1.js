function generateId() {
    return Math.floor(Math.random() * 1000);
}

function Institution(location, capacity) {
    this.id = generateId();
    this.location = location;
    this.capacity = capacity;

    this.validateCapacity = function () {
        try {
            if (this.capacity < 1) {
                throw new Error(`Invalid capacity: ${this.capacity}. Capacity must be at least 1.`);
            }
        } catch (error) {
            console.error(error.message);
        }
    };
}

function Course(description, price) {
    this.id = generateId();
    this.description = description;
    this.price = price;

    this.validatePrice = function () {
        try {
            if (this.price < 0) {
                throw new Error(`Invalid price: ${this.price}. Price cannot be negative.`);
            }
            this.price = `${this.price} €`;
        } catch (error) {
            console.error(error.message); 
        }
    };

    this.validatePrice();
}

function Person(email, phone) {
    this.id = generateId();
    this.email = email;
    this.phone = phone;

    this.validateEmail = function () {
        try {
            if (!this.email.includes('@')) {
                throw new Error(`Invalid email: ${this.email}. Email must contain '@'.`);
            }
        } catch (error) {
            console.error(error.message); 
        }
    };
}

function Academy(name, startDate, endDate, location, capacity) {
    Object.setPrototypeOf(this, new Institution(location, capacity));
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.subjects = [];
    this.students = [];

    this.getNumberOfClasses = function () {
        return this.subjects.length * 10;
    };

    this.PrintStudents = function () {
        return this.students;
    };

    this.PrintSubjects = function () {
        return this.subjects;
    };

    this.PrintAcademy = function () {
        const students = this.students.map(({ firstName, lastName, age, email, phone, currentSubject }) => ({
            fullName: `${firstName} ${lastName}`,
            age,
            email,
            phone,
            currentSubject: currentSubject ? currentSubject.title : "Not enrolled",
        }));
    
        const subjects = this.subjects.map(({ title, isElective, price, numberOfClasses }) => ({
            title,
            isElective,
            price,
            numberOfClasses,
        }));
        return {
            name: this.name,
            startDate: this.startDate,
            endDate: this.endDate,
            location: this.location,
            capacity: this.capacity,
            numberOfSubjects: this.subjects.length,
            numberOfStudents: this.students.length,
            students,
            subjects,
        };
    };
    
}

function Subject(title, isElective, description, price) {
    Object.setPrototypeOf(this, new Course(description, price));
    this.title = title;
    this.isElective = isElective;
    this.numberOfClasses = 10;
    this.students = [];

    this.overrideClasses = function (number) {
        try {
            if (number < 3) {
                throw new Error('Number of classes cannot be smaller than 3.');
            }
            this.numberOfClasses = number;
        } catch (error) {
            console.error(error.message);
        }
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
        try {
            if (!academy) throw new Error('Invalid academy');
            this.academy = academy;
            academy.students.push(this);
        } catch (error) {
            console.error(error.message);
        }
    };

    this.startSubject = function (subject) {
        try {
            if (!this.academy) {
                throw new Error('Student is not enrolled in any academy.');
            }
            if (!this.academy.subjects.includes(subject)) {
                throw new Error("Subject is not offered by the academy.");
            }
            this.currentSubject = subject;
            subject.students.push(this);
        } catch (error) {
            console.error(error.message);
        }
    };

    this.PrintStudent = function () {
        return {
            fullName: `${this.firstName} ${this.lastName}`,
            age: this.age,
            email: this.email,
            phone: this.phone,
            academy: this.academy ? this.academy.name : "Not enrolled",
            currentSubject: this.currentSubject ? this.currentSubject.title : "Not enrolled"
        };
    };
}


const academy = new Academy('QINSHIFT', '10-01-2024', '10-01-2025', 'Skopje', 100);


const student1 = new Student('Zoran', 'Nakov', 25, 'nakovzoran99gmail.com', '000-000-000'); // test za errorot
const student2 = new Student("David", "Krstevski", 25, "david_krstevski2004@gmail.com", '+38978-454-252');


student1.validateEmail(); 
student2.validateEmail(); 

const subject1 = new Subject('JavaScript', false, 'Advanced JavaScript', -2500);  // test za errorot
const subject2 = new Subject("React", true, "React Basic", 1500); 

academy.subjects.push(subject1, subject2);

student1.startAcademy(academy);
student2.startAcademy(academy);

student1.startSubject(subject1);
student2.startSubject(subject2);

subject1.overrideClasses(15);
subject2.overrideClasses(19);

const academyInfo = academy.PrintAcademy();
console.log("Academy Info:", academyInfo);

console.log("Student1", student1.PrintStudent());
console.log("Student2", student2.PrintStudent());

const academySubjects = academy.PrintSubjects();
console.log("Academy Subject1:", subject1);
console.log("Academy Subject2:", subject2);








