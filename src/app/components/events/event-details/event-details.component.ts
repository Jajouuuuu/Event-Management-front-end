import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Registration } from '../../../data/registration';
import { EventService } from '../../../services/event.service';
import { RegistrationService } from '../../../services/registration.service';
import { Event } from '../../../data/event';
import { User } from '../../../data/users';
import { SessionStorageService } from '../../../services/session-storage.service';
import { ImageService } from '../../../services/image.service';

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
  isFutureEvent?: boolean;

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
    }
  }

  getEvent(): void {
    this.eventService.getEventById(this.eventId).subscribe(
      event => {
        this.event = event;
        this.isFutureEvent = new Date(event.date) > new Date(); // Move the date check here
        if (event.image) {
          this.getImageUrl(event.image.id);
        }
      },
      error => console.error("Erreur lors de la récupération des événements :", error)
    );
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
