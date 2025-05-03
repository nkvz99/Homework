import { Course } from "./course";  

export class CourseManager {
    private courses: Course[] = [];

    addCourse(course: Course): void {
        if (this.courses.some(existingCourse => existingCourse.id === course.id)) {
            throw new Error(`Course with id ${course.id} already exists.`);
        }
        this.courses.push(course);
    }

    getCourses(): Course[] {
        return this.courses;          
    }

    getCourseById(id: number): Course {
        const course = this.courses.find(course => course.id === id);
        if (!course) {
            throw new Error(`Course with id ${id} not found.`);
        }
        return course;
        
    }

    removeCourse(id: number): boolean {
        const initialLength = this.courses.length;
        this.courses = this.courses.filter(course => course.id !== id);
        return initialLength !== this.courses.length;
    }
}