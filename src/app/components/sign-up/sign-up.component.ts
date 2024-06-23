import { Component } from '@angular/core';

import { User } from '../../data/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  user: User = {
    username: '',
    email: '',
    password: '',
    id: '',
    createdAt: ''
  };

  constructor(private userService: UsersService) { }

  signUp() {
    this.userService.createUser(this.user).subscribe(
      newUser => {
        console.log('Utilisateur créé avec succès:', newUser);
        // Optionnel : rediriger l'utilisateur vers une page de connexion
      },
      error => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
      }
    );
  }
}
