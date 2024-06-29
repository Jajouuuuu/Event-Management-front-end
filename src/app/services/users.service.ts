import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../data/users";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { SwalService } from "./swal.service";

@Injectable({
  providedIn: "root"
})
export class UsersService extends BaseService {

  private usersUrl = `${this.environmentUrl}users`;

  constructor(private http: HttpClient, swalService: SwalService) {
    super(swalService); // Appel du constructeur de BaseService avec SwalService
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}`);
  }

  updateUser(userId: string, username: string, email: string, password: string): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/${userId}`, {username, email, password});
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${userId}`);
  }

  searchUsers(username?: string, email?: string): Observable<User[]> {
    let params: { [key: string]: any } = {};
    if (username) {
      params['username'] = username;
    }
    if (email) {
      params['email'] = email;
    }
    return this.http.get<User[]>(`${this.usersUrl}/search`, { params });
  }
  

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<any>(`${this.usersUrl}/login`, body, { headers }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
}
