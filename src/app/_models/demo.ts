import { Calendar } from './calendar';
import { User } from './user';

export interface Demo{
    courseId: string;
    title: string;
    courseDescription: string;
    startDate: Date;
    endDate: Date;
    credits: number;
    departmentID: number;
    courseAssignments: CourseAssignment[];
    enrollments: Enrollment[];
    calendarEvent: Calendar;
    locationId: string;
    locationName: string;
    langitude: string;
    latitude: string;
}

export interface CourseAssignment{
    instructorID: string;
    courseID: number;
    instructor?: User;
}

export interface Enrollment{
    enrollmentID?: number;
    courseID: number;
    studentID: string;
    student?: User;
    status?: number;
}

