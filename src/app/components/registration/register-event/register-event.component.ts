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
  event?: Event;
  eventId!: string;
  registrations: Registration[] = [];
  isRegistered: boolean = false;
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

  getEvent(): void {
    this.eventService.getEventById(this.eventId).subscribe(
      event => {
        this.event = event;
      },
      error => console.error("Erreur lors de la récupération des événements :", error)
    );
  }

  loadRegistrations() {
    this.registrationService.searchRegistrations({ eventId: this.eventId})
      .subscribe(registrations => {
        this.registrations = registrations;
        const currentUserId = this.userId;
        this.isRegistered = registrations.some(registration => registration.user.id === currentUserId);
      });
  }

  registerForEvent() {
    if (this.userId) {
      this.registrationService.createRegistration(this.eventId, this.userId)
        .subscribe(() => {
          this.isRegistered = true;
          this.loadRegistrations();
        });
    }
  }

  unregisterFromEvent(registrationId: string) {
    const userId = this.sessionStorageService.getItem('userId') || '';
    this.registrationService.deleteRegistration(registrationId, userId)
      .subscribe(() => {
        this.isRegistered = false;
        this.loadRegistrations();
      });
  }

}
