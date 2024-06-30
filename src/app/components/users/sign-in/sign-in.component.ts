import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { SessionStorageService } from '../../../services/session-storage.service';

/**
 * Component for handling user sign-in functionality.
 */
@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SigninComponent {
  /** User's username for sign-in */
  username: string = '';
  /** User's password for sign-in */
  password: string = '';

  constructor(
    private userService: UsersService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  /**
   * Initiates the user login process.
   * Stores user's ID in session storage upon successful login.
   * Redirects to future events page on successful login.
   */
  login() {
    this.userService.login(this.username, this.password).subscribe(
      response => {
        console.log('Connexion réussie !', response);
        const userId = response.userId;
        this.sessionStorageService.setItem('userId', userId);
        this.router.navigate(['/events/future']);
      },
      error => {
        console.error('Erreur lors de la connexion :', error);
      }
    );
  }

  /**
   * Redirects to the forgot password route.
   */
  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
