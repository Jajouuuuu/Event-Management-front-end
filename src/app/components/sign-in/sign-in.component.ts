import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SigninComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UsersService, private router: Router) {}

  login() {
    this.userService.login(this.username, this.password).subscribe(
      response => {
        console.log('Connexion réussie !', response);
        this.router.navigate(['/event-list']);
      },
      error => {
        console.error('Erreur lors de la connexion :', error);
        // Gérer l'affichage d'un message d'erreur
      }
    );
  }
}