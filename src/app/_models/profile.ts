
import { Instructor } from './instructor';
import { Address } from './user';
import { Student } from './student';

export interface Profile{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    birthdate: Date;
    profilePic: string;
    address: Address;
    instructor?: Instructor;
    student?: Student;
}
