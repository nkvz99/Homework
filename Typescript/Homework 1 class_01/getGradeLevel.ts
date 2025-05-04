import { GradeLevel } from "./enumGradeLevel";  

export function getGradeLevel(age: number): GradeLevel {
    if (age >= 18 && age <= 19 ) {
        return GradeLevel.FRESHMAN;
    } else if (age >=  20 && age <= 21) {
        return GradeLevel.SOPHOMORE;
    } else if (age >= 22 && age <= 23) {
        return GradeLevel.JUNIOR;
    } else {
        return GradeLevel.SENIOR;
    }
}