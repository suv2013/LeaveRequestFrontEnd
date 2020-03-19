import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IUserTeam, UserTeam } from '../Model/userTeam';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IisUrl, SolutionUrl } from './url.constant';

@Injectable({
  providedIn: 'root'
})
export class UserTeamService {
  private url = IisUrl.concat('UserTeams');
  constructor(private http: HttpClient) { }

  getUserTeams(): Observable<IUserTeam[]> {
    const userTeam = this.http.get<IUserTeam[]>(this.url)
    .pipe(
      catchError(
        error => this.errorHandler(error))
      );

    return userTeam;
  }

  createUserTeam(userTeam: UserTeam): Observable<UserTeam> {
    userTeam.userTeamId = 0;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<UserTeam>(this.url,  userTeam, httpOptions)
    .pipe(
      catchError(
        error => this.errorHandler(error)
      )
    );
  }

  updateUserTeam(userTeam: UserTeam): Observable<UserTeam> {
    const userTeamUrl = this.url.concat('/' , (userTeam.userTeamId).toString());
    const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
        // 'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line: max-line-length
        // 'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization',
        // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
      })
    };
    return this.http.put<UserTeam>(userTeamUrl,  userTeam, httpOptions)
    .pipe(
      catchError(
        error => this.errorHandler(error)
      )
    );
  }

  deleteUserTeam(id: string): Observable<UserTeam> {
    const userTeamUrl = this.url.concat('/' , (id).toString());
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    return this.http.delete<UserTeam>(userTeamUrl, httpOptions)
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
