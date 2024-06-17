import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Registration } from '../../data/registration';
import { EventService } from '../../services/event.service';
import { RegistrationService } from '../../services/registration.service';
import { Event } from '../../data/event';
import { User } from '../../data/users';
import { SessionStorageService } from '../../services/session-storage.service';
import { ImageService } from '../../services/image.service';

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
  imageUrl: string = '';

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
        if (event.image) {
          this.getImageUrl(event.image.id); // Appeler getImageUrl si l'événement a une image
        }
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
    const userId = this.sessionStorageService.getItem('userId') || '';
    this.registrationService.unregisterFromEvent(registrationId, userId)
      .subscribe(() => {
        // Mettez à jour l'état de l'inscription après la suppression
        this.isRegistered = false;
        this.loadRegistrations();
      });
  }

  getImageUrl(imageId: string): void {
    this.imageService.getImageById(imageId).subscribe(
      blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(blob);
      },
      error => {
        console.error('Erreur lors de la récupération de l\'image :', error);
      }
    );
  }
}
