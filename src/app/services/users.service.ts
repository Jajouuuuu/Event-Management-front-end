import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { User } from "../data/users";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UsersService extends BaseService {

  private usersUrl = `${this.environmentUrl}users`;

  constructor(private http: HttpClient) {
    super();
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/user/name/${username}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}/user`, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/user/id/${userId}`);
  }

  updateUserEmail(userId: string, email: string): Observable<void> {
    return this.http.put<void>(`${this.usersUrl}/user/id/${userId}`, { email });
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<any>(`${this.usersUrl}/user/login`, body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue lors de la connexion.';
        if (error.error) {
          errorMessage = error.error;
        }
        return throwError(errorMessage);
      })
    );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/user/id/${userId}`);
  }

}