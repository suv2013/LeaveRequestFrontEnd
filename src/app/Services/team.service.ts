import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ITeam, Team } from '../Model/team';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IisUrl, SolutionUrl } from './url.constant';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url = IisUrl.concat('teams');
  constructor(private http: HttpClient) { }

  getTeams(): Observable<ITeam[]> {
    return this.http.get<ITeam[]>(this.url)
    .pipe(
      catchError(
        error => this.errorHandler(error))
      );
  }

  getTeam(id: string) {
    // tslint:disable-next-line: prefer-const
    let teamUrl = this.url.concat('/' , id);
    // tslint:disable-next-line: prefer-const
    let team = this.http.get<ITeam>(teamUrl)
    .pipe(
      catchError(
        error => this.errorHandler(error))
      );
    return team;
  }

  createTeam(team: Team): Observable<Team> {
    team.teamId = 0;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<Team>(this.url,  team, httpOptions)
    .pipe(
      catchError(
        error => this.errorHandler(error)
      )
    );
  }

  updateTeam(team: Team): Observable<Team> {
    const teamUrl = this.url.concat('/' , (team.teamId).toString());
    const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
        // 'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line: max-line-length
        // 'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization',
        // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
      })
    };
    return this.http.put<Team>(teamUrl,  team, httpOptions)
    .pipe(
      catchError(
        error => this.errorHandler(error)
      )
    );
  }

  deleteTeam(id: string): Observable<Team> {
    const teamUrl = this.url.concat('/' , (id).toString());
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    return this.http.delete<Team>(teamUrl, httpOptions)
    .pipe(
      catchError(
        error => this.errorHandler(error)
      )
    );
  }

  errorHandler(error) {
    console.log(error);
    return throwError(error || 'Server Error');
  }
}
