import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../data/users';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user!: User;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId') || '';
    this.userService.getUserById(userId).subscribe(
      (user: User) => this.user = user,
      error => console.error('Error fetching user information:', error)
    );
  }

  updateUserInfo(): void {
    if (this.user) {
      const { id, email, username, password } = this.user;
      this.userService.updateUser(id, email, username, password).subscribe(
        () => alert('User information updated successfully'),
        (error) => console.error('Error updating user information', error)
      );
    }
  }
}
