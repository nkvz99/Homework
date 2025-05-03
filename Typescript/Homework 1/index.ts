import { GradeLevel } from "./enumGradeLevel";
import { Student } from "./student";
import { calculateAvgGrade } from "./calculateAvgGrade";
import { getGradeLevel } from "./getGradeLevel";
import { CourseManager } from "./courseManager";
import { getTopStudents } from "./getTopStudents";
import { Course } from "./course";

const students = [
  { id: 1, name: "Zoran Nakov", age: 25, grades: [5, 6] },
  { id: 2, name: "Ana Petrov", age: 22, grades: [8, 9] },
  { id: 3, name: "Marija Stojanov", age: 23, grades: [6, 7] },
];

const courses = [
  {
    id: 1,
    name: "Typescript Basics",
    students: [],
    instructor: "Ivo Kostovski",
    maxStudents: 30,
  },
  {
    id: 2,
    name: "SQL",
    students: [],
    instructor: "Daniel Eftimov",
    maxStudents: 25,
  },
];

const courseManager = new CourseManager();


//  add  courses first
courses.forEach(course => {
  courseManager.addCourse(course);
  console.log(`Course added: ${course.name}`);
});

// dynamically assign students
function enrollStudent(courseId: number, student: Student) {
  const course = courseManager.getCourseById(courseId);
  if (!course) {
    console.warn(`Course ${courseId} not found!`);
    return;
  }
  
  if (course.students.length >= course.maxStudents) {
    console.warn(`Course ${course.name} is full!`);
    return;
  }

  course.students.push(student);
  console.log(`${student.name} enrolled in ${course.name}`);
}

enrollStudent(1, students[0]); // Zoran in TypeScript
enrollStudent(1, students[1]); // Ana in TypeScript
enrollStudent(2, students[2]); // Marija in SQL



// to check top student in exactly one course
const courseId = 2; // The course you want to check         
const course = courseManager.getCourseById(courseId);

if (course) {
  const topStudents = getTopStudents(courseManager, courseId, 2);
  
  console.log(`\nTop students in ${course.name}:`);
  topStudents.forEach(student => {
    const avg = calculateAvgGrade([student]); 
    console.log(`- ${student.name}: ${avg} average`);
  });
} else {
  console.log(`\nCourse with ID ${courseId} not found`);
}

// To check top students in all courses 
courseManager.getCourses().forEach(course => {
    const topStudents = getTopStudents(courseManager, course.id, 2);
    
    console.log(`\nTop students in ${course.name}:`);
    topStudents.forEach(student => {
      const avg = calculateAvgGrade([student]);
      console.log(`- ${student.name}: ${avg} average`);
    });
  });

// for all students avg grade
  console.log("\nIndividual Student Averages:");
students.forEach(student => {
  const avg = calculateAvgGrade([student]);
  console.log(`- ${student.name}: ${avg}`);
});



// for specific student avg grade by name or id 
console.log("\nSpecific Student Average:");
const studentName = "Ana Petrov";
const student = students.find(s => s.name === studentName);

if (student) {
  const avg = calculateAvgGrade([student]);
  console.log(`${student.name}'s average grade: ${avg}`);
} else {
  console.log(`Student "${studentName}" not found`);
}