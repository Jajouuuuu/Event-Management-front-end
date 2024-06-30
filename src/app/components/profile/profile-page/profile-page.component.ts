import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../data/users';
import { Event } from '../../../data/event';
import { SessionStorageService } from '../../../services/session-storage.service';
import { RegistrationService } from '../../../services/registration.service';
import { Registration } from '../../../data/registration';
import { UsersService } from '../../../services/users.service';
import { EventService } from '../../../services/event.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  /**
   * Utilisateur actuellement connecté
   * @type {User | undefined}
   */
  user?: User = {
    id: '',
    username: '',
    email: '',
    password: '',
    createdAt: ''
  };

  /**
   * Liste des inscriptions de l'utilisateur
   * @type {Registration[]}
   */
  registrations: Registration[] = [];

  /**
   * Liste des événements créés par l'utilisateur
   * @type {Event[]}
   */
  eventsCreatedByUser: Event[] = [];

  constructor(
    private registrationService: RegistrationService,
    private userService: UsersService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private eventService: EventService,
    private swalService: SwalService
  ) { }

  /**
   * Lifecycle hook called after data-bound properties are initialized
   */
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

  /**
   * Charge les inscriptions de l'utilisateur à partir du service RegistrationService
   * @param {string} userId - Identifiant de l'utilisateur
   */
  loadUserRegistrations(userId: string): void {
    this.registrationService.searchRegistrations({ userId: userId }).subscribe(
      (registrations) => (this.registrations = registrations),
      (error) => console.error('Error loading registrations', error)
    );
  }

  /**
   * Charge les événements créés par l'utilisateur à partir du service EventService
   * @param {string} createdBy - Identifiant de l'utilisateur créateur des événements
   */
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

  /**
   * Supprime le compte de l'utilisateur après confirmation
   */
  deleteAccount(): void {
    if (this.user) {
      const userId = this.user.id;
      this.swalService.confirm('Confirmation', 'Êtes-vous sûr de vouloir supprimer votre compte ?')
        .then((result) => {
          if (result === true) {
            this.userService.deleteUser(userId).subscribe(
              () => {
                this.swalService.success('Compte supprimé avec succès', 'Vous allez être redirigé !');
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
