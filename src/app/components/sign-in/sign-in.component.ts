import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SigninComponent {
  username: string = '';
  password: string = '';


  constructor(private userService: UsersService, private router: Router, private sessionStorageService: SessionStorageService) { }

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
}