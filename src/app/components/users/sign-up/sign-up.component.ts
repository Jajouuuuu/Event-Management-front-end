import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../data/users';
import { UsersService } from '../../../services/users.service';
import { SwalService } from '../../../services/swal.service';

/**
 * Component for user sign-up functionality.
 */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  /** User object to store sign-up form data */
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

  /**
   * Initiates the user sign-up process.
   * Calls the UserService to create a new user with the provided details.
   * Displays success message and navigates to sign-in page upon successful creation.
   * Displays error message if user creation fails.
   */
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
