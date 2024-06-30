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
  /**
   * The ID of the event being viewed
   * @type {string}
   */
  eventId!: string;

  /**
   * The event details
   * @type {Event | undefined}
   */
  event?: Event;

  /**
   * List of registrations for the event
   * @type {Registration[]}
   */
  registrations: Registration[] = [];

  /**
   * Flag to indicate if the user is registered for the event
   * @type {boolean}
   */
  isRegistered: boolean = false;

  /**
   * The ID of the current user
   * @type {string}
   */
  userId!: string;

  /**
   * URL of the event image
   * @type {string}
   */
  imageUrl: string = '';

  /**
   * Flag to indicate if the event is a future event
   * @type {boolean | undefined}
   */
  isFutureEvent?: boolean;

  /**
   * Constructor for EventDetailsComponent
   * @param {ActivatedRoute} route - Service to access route parameters
   * @param {EventService} eventService - Service for event-related operations
   * @param {RegistrationService} registrationService - Service for registration-related operations
   * @param {SessionStorageService} sessionStorageService - Service for session storage operations
   * @param {ImageService} imageService - Service for image-related operations
   */
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private registrationService: RegistrationService,
    private sessionStorageService: SessionStorageService,
    private imageService: ImageService,
  ) { }

  /**
   * Lifecycle hook called on component initialization
   */
  ngOnInit(): void {
    this.userId = this.sessionStorageService.getItem('userId') || '';
    if (this.userId) {
      this.eventId = this.route.snapshot.paramMap.get('eventId')!;
      this.getEvent();
    }
  }

  /**
   * Fetch the event details by event ID
   */
  getEvent(): void {
    this.eventService.getEventById(this.eventId).subscribe(
      event => {
        this.event = event;
        this.isFutureEvent = new Date(event.dateTime) > new Date();
        if (event.image) {
          this.fetchImage(event.image.url);
        }
      },
      error => console.error("Erreur lors de la récupération des événements :", error)
    );
  }

  /**
   * Fetch the image by file name and convert it to a data URL
   * @param {string} fileName - The name of the file to fetch
   */
  fetchImage(fileName: string): void {
    this.imageService.getFile(fileName).subscribe(
      (blob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(blob);
      },
      error => {
        console.error('Failed to fetch image:', error);
      }
    );
  }
}
