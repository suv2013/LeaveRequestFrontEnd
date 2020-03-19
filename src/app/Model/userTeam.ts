import { ITeam } from './team';
import { IUser } from './user';

export interface IUserTeam {
    userTeamId: number;
    userId: number;
    teamId: number;
    timeStamp: Date;
    team: ITeam;
    user: IUser;
}

export class UserTeam implements IUserTeam {
    userTeamId: number;
    userId: number;
    teamId: number;
    timeStamp: Date;
    team: ITeam;
    user: IUser;
}

