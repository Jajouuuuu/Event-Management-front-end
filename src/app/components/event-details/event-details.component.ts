import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Registration } from '../../data/registration';
import { EventService } from '../../services/event.service';
import { RegistrationService } from '../../services/registration.service';
import { Event } from '../../data/event';
import { User } from '../../data/users';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  eventId!: string;
  event?: Event;
  registrations: Registration[] = [];
  isRegistered: boolean = false;
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private registrationService: RegistrationService,
    private sessionStorageService: SessionStorageService
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
    this.registrationService.getRegistrationsByEventId(this.eventId)
      .subscribe(registrations => {
        this.registrations = registrations;
        const currentUserId = this.userId;
        this.isRegistered = registrations.some(registration => registration.user.id === currentUserId);
      });
  }

  registerForEvent() {
    if (this.userId) {
      this.registrationService.registerForEvent(this.eventId, this.userId)
        .subscribe(() => {
          this.isRegistered = true;
          this.loadRegistrations();
        });
    }
  }

  unregisterFromEvent(registrationId: string) {
    this.registrationService.unregisterFromEvent(registrationId)
      .subscribe(() => {
        this.isRegistered = false;
        this.loadRegistrations();
      });
  }
}
