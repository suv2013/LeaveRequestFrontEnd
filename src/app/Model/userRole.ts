import { IRole } from './role';
import { IUser } from './user';
import { IUserTeam } from './userTeam';

export interface IUserRole {
    userRoleId: number;
    userId: number;
    roleId: number;
    timeStamp: Date;
    role: IRole;
    user: IUser;
}

export class UserRole implements IUserRole {
    userRoleId: number;
    userId: number;
    roleId: number;
    timeStamp: Date;
    role: IRole;
    user: IUser;
}

