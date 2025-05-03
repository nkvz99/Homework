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
    { id: 3, name: "Marija Stojanov", age: 23, grades: [6, 7] }
  ];
  
  const courses = [
    {
      id: 1,
      name: "Typescript Basics",
      students: [students[0], students[1]],
      instructor: "Ivo Kostovski",
      maxStudents: 30
    },
    {
      id: 2,
      name: "SQL",
      students: [students[2]],
      instructor: "Daniel Eftimov",
      maxStudents: 25
    }
  ];

  const courseManager = new CourseManager();
console.log("Adding courses to manager...");
courses.forEach(course => {
  courseManager.addCourse(course);
  console.log(`✓ Added: ${course.name} (ID: ${course.id})`);
});


console.log("\nStudent Grades Report:");
students.forEach(student => {
  console.log(`\n${student.name}'s grades:`);
  student.grades.forEach((grade, i) => {
    console.log(`  ${courses[i]?.name || 'Unknown Course'}: ${grade}`);
  });
});

console.log("\nStudent Summaries:");
students.forEach(student => {
  const avg = calculateAvgGrade([student]);
  console.log(
    `${student.name} (${getGradeLevel(student.age)}): ${avg.toFixed(1)} avg`
  );
});


console.log("\nTop Students:");
const topStudents = getTopStudents(courseManager, 1, 2);
topStudents.forEach((student, i) => {
  console.log(`${i + 1}. ${student.name}: ${calculateAvgGrade([student]).toFixed(1)} avg`);
});
