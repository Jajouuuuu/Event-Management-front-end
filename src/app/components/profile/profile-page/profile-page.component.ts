import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../data/users';
import { Event } from '../../../data/event';
import { SessionStorageService } from '../../../services/session-storage.service';
import { RegistrationService } from '../../../services/registration.service';
import { Registration } from '../../../data/registration';
import { UsersService } from '../../../services/users.service';
import { EventService } from '../../../services/event.service';
import { SwalService } from '../../../services/swal.service'; // Assurez-vous d'importer le service SwalService

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
    private eventService: EventService,
    private swalService: SwalService // Injection du service SwalService
  ) { }

  ngOnInit(): void {
    const userId = this.sessionStorageService.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user: User) => {
          this.user = user;
          this.loadUserRegistrations(userId);
          this.loadEventsCreatedByUser(userId);
        },
        error => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }

  loadUserRegistrations(userId: string): void {
    this.registrationService.searchRegistrations({ userId: userId }).subscribe(
      (registrations) => (this.registrations = registrations),
      (error) => console.error('Error loading registrations', error)
    );
  }

  loadEventsCreatedByUser(createdBy: string): void {
    this.eventService.searchEvents({ createdById: createdBy }).subscribe(
      (events: Event[]) => {
        this.eventsCreatedByUser = events;
      },
      error => {
        console.error('Error fetching events created by user:', error);
      }
    );
  }

  deleteAccount(): void {
    if (this.user) {
      const userId = this.user.id;
      this.swalService.confirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer votre compte ?')
        .then((result) => {
          if (result === true) {
            this.userService.deleteUser(userId).subscribe(
              () => {
                this.swalService.success('Compte supprimé avec succès', 'Redirection dans 2 secondes');
                setTimeout(() => {
                  this.sessionStorageService.clear();
                  this.router.navigate(['/sign-up']);
                }, 2000);
              },
              (error) => {
                this.swalService.error('Erreur lors de la suppression du compte', error.message ? error.message : 'Une erreur est survenue lors de la suppression du compte.');
              }
            );
          }
        });
    }
  }
}
