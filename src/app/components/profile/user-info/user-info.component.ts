import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../data/users';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  /**
   * Utilisateur dont les informations seront affichées et potentiellement mises à jour
   * @type {User}
   */
  user!: User;

  constructor(private userService: UsersService, private swalService: SwalService) { }

  /**
   * Lifecycle hook called after data-bound properties are initialized
   */
  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId') || '';
    this.userService.getUserById(userId).subscribe(
      (user: User) => this.user = user,
      error => console.error('Error fetching user information:', error)
    );
  }

  /**
   * Met à jour les informations de l'utilisateur
   */
  updateUserInfo(): void {
    if (this.user) {
      const { id, email, username, password } = this.user;
      this.userService.updateUser(id, email, username, password).subscribe(
        () => this.swalService.success('Information !', 'Vos informations ont bien été mises à jour !'),
        (error) => this.swalService.error('Information !', 'Une erreur est survenue lors de la mise à jour de vos informations !')
      );
    }
  }
}
