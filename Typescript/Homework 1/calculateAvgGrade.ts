import { Student } from "./student";  


export function calculateAvgGrade(students: Student[]): number {
    if (!students?.length) return 0;

    let totalSum = 0;
    let totalCount = 0;

    for (const student of students) {
        if (!student.grades?.length) continue;
        
        let sum = 0;
        for (const grade of student.grades) {
            sum += grade;
        }
        
        totalSum += sum;
        totalCount += student.grades.length;
        
        if (totalCount > 0 && totalCount === students.length) break;
    }

    return totalCount ? totalSum / totalCount : 0;
}


