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
        return this.http.get<User>(`${this.usersUrl}/byname/${username}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.usersUrl, user);
      }

    login(username: string, password: string): Observable<any> {
        const body = { username, password };
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': '*/*'
        });
        return this.http.post(`${this.usersUrl}/login`, body, { headers, responseType: 'text' }).pipe(
            catchError((error: HttpErrorResponse) => {
              let errorMessage = 'Une erreur est survenue lors de la connexion.';
              if (error.error) {
                errorMessage = error.error;
              }
              return throwError(errorMessage);
            })
          );;
      }

}