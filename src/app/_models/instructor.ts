import { AcademicType } from './academictype';

export interface Instructor {
    userId: string;
    board: string;
    academyTypeId: number;
    academyType?: AcademicType;
    subjects: string;
    level: string;
    isTutorBefore: true;
    professionalDescription: string;
    preference: string;
    availableDays: string;
    highestEducation: string;
    preferredDistance: number;
    preferredTimeSlot: string;
    hourlyRate: number;
    currency: string;
    idType: string;
    idDoc: string;
    demoLink: string;
    intersets: string;
    medium: string;
}
