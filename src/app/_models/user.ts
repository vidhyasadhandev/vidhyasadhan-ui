export interface User {
    id?: string;
    username?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    jwtToken?: string;
    refreshToken?: string;
    gender?: string;
    addresses?: Address[];
    profilePic?: string;
    role?: number;
}

export interface Address{
    addressId: number;
    addressType: number;
    address1: string;
    address2: string;
    city: string;
    pinCode: string;
    stateCd: string;
    countryCd: string;
}