import { Student } from "./student";

export interface Course {
    id: number;
    name: string;
    students: Student[];
    instructor: string;
    maxStudents: number;
};

