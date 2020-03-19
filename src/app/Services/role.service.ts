import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IRole, Role } from '../Model/role';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IisUrl, SolutionUrl } from './url.constant';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = IisUrl.concat('roles');
  constructor(private http: HttpClient) { }

  getRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(this.url)
    .pipe(
      catchError(
        error => this.errorHandler(error))
      );
  }

  getRole(id: string) {
    // tslint:disable-next-line: prefer-const
    let roleUrl = this.url.concat('/' , id);
    // tslint:disable-next-line: prefer-const
    let role = this.http.get<IRole>(roleUrl)
    .pipe(
      catchError(
        error => this.errorHandler(error))
      );
    return role;
  }

  createRole(role: Role): Observable<Role> {
    role.roleId = 0;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<Role>(this.url,  role, httpOptions)
    .pipe(
      catchError(
        error => this.errorHandler(error)
      )
    );
  }

  updateRole(role: Role): Observable<Role> {
    const roleUrl = this.url.concat('/' , (role.roleId).toString());
    const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
        // 'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line: max-line-length
        // 'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization',
        // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE'
      })
    };
    return this.http.put<Role>(roleUrl,  role, httpOptions)
    .pipe(
      catchError(
        error => this.errorHandler(error)
      )
    );
  }

  deleteRole(id: string): Observable<Role> {
    const roleUrl = this.url.concat('/' , (id).toString());
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    return this.http.delete<Role>(roleUrl, httpOptions)
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
