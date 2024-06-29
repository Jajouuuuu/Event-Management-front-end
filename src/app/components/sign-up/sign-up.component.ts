import { Component } from '@angular/core';

import { User } from '../../data/users';
import { UsersService } from '../../services/users.service';
import { FormBuilder } from '@angular/forms';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private swalService: SwalService,
    private router: Router
  ) { }

  signUp() {
    this.userService.createUser(this.user).subscribe(
      newUser => {
        console.log('Utilisateur créé avec succès:', newUser);
        this.swalService.success('Success', 'User created successfully');
        this.router.navigate(['/sign-in']);
      },
      error => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
          this.swalService.error('Error', 'Failed to create user');
      }
    );
  }

}
