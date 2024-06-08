import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../data/users";
import { Observable } from "rxjs";

@Injectable()
export class UsersService extends BaseService {

    private usersUrl = `${this.environmentUrl}users`;

    constructor(private http: HttpClient, private router: Router) {
        super();
    }

    getUserByUsername(username: string): Observable<User> {
        return this.http.get<User>(`${this.usersUrl}/byname/${username}`);
    }

    loginUser(username: string, password: string): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            this.getUserByUsername(username).subscribe((user: User) => {
                if (user && user.password === password) {
                    observer.next(true); // Connexion réussie
                } else {
                    observer.next(false); // Connexion échouée
                }
            }, (error) => {
                observer.next(false); // Connexion échouée
            });
        });
    }
}