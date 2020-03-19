export interface IRole {
    roleId: number;
    roleName: string;
    timeStamp: Date;
}

export class Role implements IRole {
    roleId: number;
    roleName: string;
    timeStamp: Date;
}
