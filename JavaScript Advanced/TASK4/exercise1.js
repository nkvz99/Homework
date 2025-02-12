
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
    this.id = Math.floor(Math.random() * 1000);
    this.description = description;
    this.price = price;

    this.validatePrice = function () {
        if (this.price < 0) {
            throw new Error(`Invalid price: ${this.price}. Price cannot be negative.`);
        }
        this.price = `${this.price} €`;
    };

    this.validatePrice(); 
}

function Person(email, phone) {
    this.id = Math.floor(Math.random() * 1000);
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
        return {
            name: this.name,
            startDate: this.startDate,
            endDate: this.endDate,
            location: this.location,
            capacity: this.capacity,
            numberOfSubjects: this.subjects.length,
            numberOfStudents: this.students.length,
            students: this.students.map(student => ({
                fullName: `${student.firstName} ${student.lastName}`,
                age: student.age,
                email: student.email,
                phone: student.phone,
                currentSubject: student.currentSubject ? student.currentSubject.title : "Not enrolled"
            })),
            subjects: this.subjects.map(subject => ({
                title: subject.title,
                isElective: subject.isElective,
                price: subject.price,
                numberOfClasses: subject.numberOfClasses
            }))
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
        academy.students.push(this);
    };

    this.startSubject = function (subject) {
        if (!this.academy) {
            console.error('Student is not enrolled in any academy.');
            return;
        }
        if (!this.academy.subjects.includes(subject)) {
            console.error("Subject is not offered by the academy.");
            return;
        }
        this.currentSubject = subject;
        subject.students.push(this); 
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


const student1 = new Student('Zoran', 'Nakov', 25, 'nakovzoran99@gmail.com', '000-000-000');
const student2 = new Student("David", "Krstevski", 25, "david_krstevski2004@gmail.com", '+38978-454-252');


const subject1 = new Subject('JavaScript', false, 'Advanced JavaScript', 2500);
const subject2 = new Subject("React", true, "React Basic", 1500);


academy.subjects.push(subject1, subject2);


student1.startAcademy(academy);
student2.startAcademy(academy);


student1.startSubject(subject1);
student2.startSubject(subject2);


subject1.overrideClasses(15);




const academyInfo = academy.PrintAcademy();
console.log("Academy Info:", academyInfo);


console.log("Student1",student1);
console.log("Student2",student2);

const academySubjects = academy.PrintSubjects()
console.log("Academy Subjects:", academySubjects)








