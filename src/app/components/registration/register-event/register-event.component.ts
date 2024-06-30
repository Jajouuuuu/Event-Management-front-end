import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { RegistrationService } from '../../../services/registration.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { ImageService } from '../../../services/image.service';
import { Registration } from '../../../data/registration';
import { Event } from '../../../data/event';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.css']
})
export class RegisterEventComponent implements OnInit {
  /**
   * Événement pour lequel l'utilisateur s'enregistre
   * @type {Event | undefined}
   */
  event?: Event;

  /**
   * ID de l'événement récupéré depuis les paramètres de l'URL
   * @type {string}
   */
  eventId!: string;

  /**
   * Liste des enregistrements pour cet événement
   * @type {Registration[]}
   */
  registrations: Registration[] = [];

  /**
   * Indique si l'utilisateur est déjà enregistré pour cet événement
   * @type {boolean}
   */
  isRegistered: boolean = false;

  /**
   * ID de l'utilisateur actuellement connecté
   * @type {string}
   */
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private registrationService: RegistrationService,
    private sessionStorageService: SessionStorageService,
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    this.userId = this.sessionStorageService.getItem('userId') || '';
    if (this.userId) {
      this.eventId = this.route.snapshot.paramMap.get('eventId')!;
      this.getEvent();
      this.loadRegistrations();
    }
  }

  /**
   * Récupère les détails de l'événement par son ID
   */
  getEvent(): void {
    this.eventService.getEventById(this.eventId).subscribe(
      event => {
        this.event = event;
      },
      error => console.error("Erreur lors de la récupération des événements :", error)
    );
  }

  /**
   * Charge les inscriptions pour cet événement et vérifie si l'utilisateur est déjà inscrit
   */
  loadRegistrations() {
    this.registrationService.searchRegistrations({ eventId: this.eventId })
      .subscribe(registrations => {
        this.registrations = registrations;
        const currentUserId = this.userId;
        this.isRegistered = registrations.some(registration => registration.user.id === currentUserId);
      });
  }

  /**
   * Enregistre l'utilisateur pour cet événement
   */
  registerForEvent() {
    if (this.userId) {
      this.registrationService.createRegistration(this.eventId, this.userId)
        .subscribe(() => {
          this.isRegistered = true;
          this.loadRegistrations();
        });
    }
  }

  /**
   * Désinscrit l'utilisateur de cet événement
   * @param {string} registrationId - ID de l'inscription à supprimer
   */
  unregisterFromEvent(registrationId: string) {
    const userId = this.sessionStorageService.getItem('userId') || '';
    this.registrationService.deleteRegistration(registrationId, userId)
      .subscribe(() => {
        this.isRegistered = false;
        this.loadRegistrations();
      });
  }
}
