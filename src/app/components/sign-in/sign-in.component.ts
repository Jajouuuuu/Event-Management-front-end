import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SigninComponent {
    username: string = '';
    password: string = '';
    loginFailed: boolean = false;
  
    constructor(private userService: UsersService) { }
  
    login() {
      this.userService.loginUser(this.username, this.password).subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          console.log('Connexion réussie');
        } else {
          this.loginFailed = true;
        }
      });
    }
  }
