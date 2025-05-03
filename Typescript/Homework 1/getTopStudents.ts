import { Student } from "./student";    
import { CourseManager } from "./courseManager";
import { calculateAvgGrade } from "./calculateAvgGrade";



export function getTopStudents(
    courseManager: CourseManager, 
    courseId: number,
    n: number
): Student[] {
    const course = courseManager.getCourseById(courseId);
    if (!course) {
        throw new Error(`Course with id ${courseId} not found.`);
    }
    if (n <= 0) {
        throw new Error(`Number of top students must be greater than 0.`);
    }
    
    const sortedStudents = [...course.students].sort((a, b) => {
        const avgA = a.grades.reduce((sum, grade) => sum + grade, 0) / a.grades.length;
        const avgB = b.grades.reduce((sum, grade) => sum + grade, 0) / b.grades.length;
        return avgB - avgA;
    });
    
    return sortedStudents.slice(0, n);
}