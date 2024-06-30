import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../data/users";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { SwalService } from "./swal.service";

/**
 * Service for managing user-related operations, including CRUD operations, login, and search.
 * Extends BaseService for error handling using SwalService for notifications.
 */
@Injectable({
  providedIn: "root"
})
export class UsersService extends BaseService {

  private usersUrl = `${this.environmentUrl}users`;

  constructor(private http: HttpClient, swalService: SwalService) {
    super(swalService); // Calls the BaseService constructor with SwalService
  }

  /**
   * Retrieves a user by ID.
   * @param userId The ID of the user to retrieve
   * @returns An Observable emitting the user data
   */
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${userId}`);
  }

  /**
   * Creates a new user.
   * @param user The user object containing username, email, and password
   * @returns An Observable emitting the created user data
   */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.usersUrl}`, user);
  }

  /**
   * Retrieves all users.
   * @returns An Observable emitting an array of users
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}`);
  }

  /**
   * Updates a user's information.
   * @param userId The ID of the user to update
   * @param username The updated username
   * @param email The updated email
   * @param password The updated password
   * @returns An Observable emitting the updated user data
   */
  updateUser(userId: string, username: string, email: string, password: string): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/${userId}`, { userId, username, email, password });
  }

  /**
   * Deletes a user by ID.
   * @param userId The ID of the user to delete
   * @returns An Observable emitting void upon successful deletion
   */
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${userId}`);
  }

  /**
   * Searches for users based on username and/or email.
   * @param username The username to search for (optional)
   * @param email The email to search for (optional)
   * @returns An Observable emitting an array of users matching the search criteria
   */
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

  /**
   * Logs in a user with the provided credentials.
   * @param username The username of the user
   * @param password The password of the user
   * @returns An Observable emitting the login response
   */
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
