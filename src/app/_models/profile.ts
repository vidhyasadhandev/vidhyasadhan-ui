
import { Instructor } from './instructor';
import { Address } from './user';

export interface Profile{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    birthdate: Date;
    profilePic: string;
    address: Address;
    instructor: Instructor;
}
