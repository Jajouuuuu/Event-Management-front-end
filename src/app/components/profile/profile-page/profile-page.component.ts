import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../data/users';
import { Event } from '../../../data/event';
import { SessionStorageService } from '../../../services/session-storage.service';
import { RegistrationService } from '../../../services/registration.service';
import { Registration } from '../../../data/registration';
import { UsersService } from '../../../services/users.service';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user?: User = {
    id: '',
    username: '',
    email: '',
    password: '',
    createdAt: ''
  };
  registrations: Registration[] = [];
  eventsCreatedByUser: Event[] = [];

  constructor(
    private registrationService: RegistrationService,
    private userService: UsersService,
    private sessionStorageService: SessionStorageService,
    private router: Router, 
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    const userId = this.sessionStorageService.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user: User) => {
          this.user = user;
          this.loadUserRegistrations(userId);
        },
        error => {
          console.error('Error fetching user:', error);
        }
      );
    this.eventService.getEventsCreatedByUser(userId).subscribe(
      (events: Event[]) => {
        this.eventsCreatedByUser = events;
      },
      error => {
        console.error('Error fetching events created by user:', error);
      }
    );
  }
  }

  loadUserRegistrations(userId: string): void {
    this.registrationService.getRegistrationsByUserId(userId).subscribe(
      (registrations) => (this.registrations = registrations),
      (error) => console.error('Error loading registrations', error)
    );
  }

  deleteAccount(): void {
    if (this.user) {
      const userId = this.user.id;
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.sessionStorageService.clear();
          this.router.navigate(['/sign-up']);
        },
        (error) => console.error('Error deleting account', error)
      );
    }
  }
}
