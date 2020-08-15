import { AcademicType } from './academictype';

export interface Student {
    userId: string;
    board: string;
    academyTypeId: number;
    academyType?: AcademicType;
    subjects: string;
    level: string;
    intersets: string;
    medium: string;
  }
