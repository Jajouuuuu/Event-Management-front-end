import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { SwalService } from '../../../services/swal.service';

/**
 * Component for handling password reset functionality.
 */
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  /** User's email for password reset */
  email: string = '';
  /** New password for password reset */
  newPassword: string = '';

  constructor(
    private userService: UsersService,
    private router: Router,
    private swalService: SwalService
  ) { }

  /**
   * Initiates the password reset process by updating user's password.
   * Displays success or error messages based on the API response.
   * Redirects to sign-in page on successful password reset.
   */
  resetPassword() {
    this.userService.searchUsers(undefined, this.email).subscribe(
      users => {
        if (users.length > 0) {
          const user = users[0];
          this.userService.updateUser(user.id, user.username, this.email, this.newPassword).subscribe(
            response => {
              console.log('Mot de passe réinitialisé avec succès !', response);
              this.swalService.success('Mot de passe réinitialisé avec succès !', 'Vous allez être redirigé vers la page de connexion');
              this.router.navigate(['/sign-in']);
            },
            error => {
              this.swalService.error('Une erreur est survenue !', 'Votre mot de passe n\'a pas été réinitialisé veuillez réessayer !');
              console.error('Erreur lors de la réinitialisation du mot de passe :', error);
            }
          );
        } else {
          this.swalService.error('Erreur', 'Aucun utilisateur trouvé avec cet email.');
        }
      },
      error => {
        console.error('Erreur lors de la recherche d\'utilisateurs :', error);
        this.swalService.error('Erreur', 'Une erreur est survenue lors de la recherche d\'utilisateurs.');
      }
    );
  }
}
