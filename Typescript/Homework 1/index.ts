import { GradeLevel } from "./enumGradeLevel";
import { Student } from "./student";
import { calculateAvgGrade } from "./calculateAvgGrade";
import { getGradeLevel } from "./getGradeLevel";
import { CourseManager } from "./courseManager";
import { getTopStudents } from "./getTopStudents";
import { Course } from "./course";

const students: Student[] = [
  { id: 1, name: "Zoran Nakov", age: 25, grades: [5, 6] },
  { id: 2, name: "Ana Petrov", age: 22, grades: [8, 9] },
  { id: 3, name: "Marija Stojanov", age: 23, grades: [6, 7] },
];

const Qinshift: Course[] = [
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

// Add courses first
Qinshift.forEach(course => {
  courseManager.addCourse(course);
  console.log(`Course added: ${course.name}`);
});

// Dynamically assign students
function enrollStudent(courseId: number, student: Student) {
  const course = courseManager.getCourseById(courseId);
  if (!course) {
    console.log(`Course ${courseId} not found!`);
    return;
  }
  
  if (course.students.length >= course.maxStudents) {
    console.log(`Course ${course.name} is full!`);
    return;
  }

  course.students.push(student);
  console.log(`${student.name} enrolled in ${course.name}`);
}

// Enroll students               // Add students to courses
enrollStudent(1, students[0]); // Zoran in TypeScript
enrollStudent(1, students[1]); // Ana in TypeScript
enrollStudent(2, students[2]); // Marija in SQL

// Check top student in a specific course
const courseId = 2; // The course you want to check         
const course = courseManager.getCourseById(courseId);

if (course) {
  const topStudents = getTopStudents(courseManager, courseId, 2);         // Here by 3th parameter you can set how many top students you want to get
  console.log(`\nTop student in ${course.name}:`);
  topStudents.forEach(student => {
    const avg = calculateAvgGrade([student]); 
    const level = getGradeLevel(student.age);
    console.log(`- ${student.name}: ${avg} average (${level})`);
  });
} else {
  console.log(`\nCourse with ID ${courseId} not found`);
}

// Check top students in all courses 
courseManager.getCourses().forEach(course => {
  const topStudents = getTopStudents(courseManager, course.id, 1);
  
  console.log(`\nTop student in ${course.name}:`);
  topStudents.forEach(student => {
    const avg = calculateAvgGrade([student]);
    const level = getGradeLevel(student.age);
    console.log(`- ${student.name}: ${avg} average (${level})`);
  });
});

// Individual student averages
console.log("\nIndividual Student Averages:");
students.forEach(student => {
  const avg = calculateAvgGrade([student]);
  const level = getGradeLevel(student.age);
  console.log(`- ${student.name}: ${avg} average (${level})`);
});







// Display detailed information for all students
console.log("\n===== ALL STUDENT INFORMATION =====");
students.forEach(student => {
  const avg = calculateAvgGrade([student]);
  const level = getGradeLevel(student.age);
  
  // Find which courses this student is enrolled in
  const enrolledCourses: string[] = [];
  courseManager.getCourses().forEach(course => {
    if (course.students.some(s => s.id === student.id)) {
      enrolledCourses.push(course.name);
    }
  });
  
  console.log(`\nID: ${student.id}`);
  console.log(`Name: ${student.name}`);
  console.log(`Age: ${student.age}`);
  console.log(`Grades: ${student.grades.join(', ')}`);
  console.log(`Average Grade: ${avg}`);
  console.log(`Grade Level: ${level}`);
  console.log(`Enrolled Courses: ${enrolledCourses.length > 0 ? enrolledCourses.join(', ') : 'None'}`);
  console.log("-----------------------------");
});

// Search student by ID
const searchById = (id: number) => {
  console.log(`\n===== STUDENT WITH ID ${id} =====`);
  const student = students.find(s => s.id === id);
  if (student) {
    const avg = calculateAvgGrade([student]);
    const level = getGradeLevel(student.age);
    
    // Find which courses this student is enrolled in
    const enrolledCourses: string[] = [];
    courseManager.getCourses().forEach(course => {
      if (course.students.some(s => s.id === student.id)) {
        enrolledCourses.push(course.name);
      }
    });
    
    console.log(`ID: ${student.id}`);
    console.log(`Name: ${student.name}`);
    console.log(`Age: ${student.age}`);
    console.log(`Grades: ${student.grades.join(', ')}`);
    console.log(`Average Grade: ${avg}`);
    console.log(`Grade Level: ${level}`);
    console.log(`Enrolled Courses: ${enrolledCourses.length > 0 ? enrolledCourses.join(', ') : 'None'}`);
  } else {
    console.log(`No student found with ID ${id}`);
  }
};


searchById(2)