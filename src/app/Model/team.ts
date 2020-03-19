export interface ITeam {
    teamId: number;
    teamName: string;
    timeStamp: Date;
}
export class Team implements ITeam {
    teamId: number;
    teamName: string;
    timeStamp: Date;
}
