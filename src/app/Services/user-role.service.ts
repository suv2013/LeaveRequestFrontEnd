import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IUserRole, UserRole } from '../Model/userRole';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IisUrl, SolutionUrl } from './url.constant';


@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private url = IisUrl.concat('UserRoles');
  constructor(private http: HttpClient) { }

  getUserRoles(): Observable<IUserRole[]> {
    const userRole = this.http.get<IUserRole[]>(this.url)
    .pipe(
      catchError(
        error => this.errorHandler(error))
      );

    return userRole;
  }

  getUserRole(id: string) {
    // tslint:disable-next-line: prefer-const
    let userRoleUrl = this.url.concat('/' , id);
    // tslint:disable-next-line: prefer-const
    let userRole = this.http.get<UserRole>(userRoleUrl)
    .pipe(
      catchError(
        error => this.errorHandler(error))
      );
    return userRole;
  }

  createUserRole(userRole: UserRole): Observable<UserRole> {
    userRole.userRoleId = 0;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<UserRole>(this.url,  userRole, httpOptions)
    .pipe(
      catchError(
        error => this.errorHandler(error)
      )
    );
  }

  updateUserRole(userRole: UserRole): Observable<UserRole> {
    const userRoleUrl = this.url.concat('/' , (userRole.userRoleId).toString());
    const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
        // 'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line: max-line-length
        // 'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization',
        // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
      })
    };
    return this.http.put<UserRole>(userRoleUrl,  userRole, httpOptions)
    .pipe(
      catchError(
        error => this.errorHandler(error)
      )
    );
  }

  deleteUserRole(id: string): Observable<UserRole> {
    const userRoleUrl = this.url.concat('/' , (id).toString());
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    return this.http.delete<UserRole>(userRoleUrl, httpOptions)
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


