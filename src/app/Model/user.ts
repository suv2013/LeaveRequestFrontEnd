export interface IUser {
    userId: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    fullname: string;
    timeStamp: Date;
}

export class User implements IUser {
    userId: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    fullname: string;
    timeStamp: Date;
}
