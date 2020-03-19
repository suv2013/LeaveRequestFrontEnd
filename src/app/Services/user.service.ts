import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IUser, User } from '../Model/user';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IisUrl, SolutionUrl } from './url.constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = IisUrl.concat('Users');
  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url)
    .pipe(
      catchError(
        error => this.errorHandler(error))
      );
  }

  getUser(id: string) {
    // tslint:disable-next-line: prefer-const
    let userUrl = this.url.concat('/' , id);
    // tslint:disable-next-line: prefer-const
    let user = this.http.get<IUser>(userUrl)
    .pipe(
      catchError(
        error => this.errorHandler(error))
      );
    return user;
  }

  createUser(user: User): Observable<User> {
    user.userId = 0;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<User>(this.url,  user, httpOptions)
    .pipe(
      catchError(
        error => this.errorHandler(error)
      )
    );
  }

  updateUser(user: User): Observable<User> {
    const userUrl = this.url.concat('/' , (user.userId).toString());
    const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin': '*',
        // // tslint:disable-next-line: max-line-length
        //  'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization',
        //  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
      })
    };
    return this.http.put<User>(userUrl,  user, httpOptions)
    .pipe(
      catchError(
        error => this.errorHandler(error)
      )
    );
  }

  deleteUser(id: string): Observable<User> {
    const userUrl = this.url.concat('/' , (id).toString());
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    return this.http.delete<User>(userUrl, httpOptions)
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
