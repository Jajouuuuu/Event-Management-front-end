import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../data/users';
import { Event } from '../../../data/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  /**
   * List of events to be displayed
   * @type {Event[]}
   */
  events: Event[] = [];

  /**
   * The current user
   * @type {User}
   */
  user!: User;

  /**
   * Type of events to display (either 'future' or 'past')
   * @type {'future' | 'past'}
   */
  eventType: 'future' | 'past' = 'future';

  /**
   * Constructor for EventListComponent
   * @param {ActivatedRoute} route - Service to access route parameters
   * @param {EventService} eventService - Service for event-related operations
   * @param {SessionStorageService} sessionStorageService - Service for session storage operations
   * @param {UsersService} userService - Service for user-related operations
   * @param {Router} router - Service to navigate between routes
   */
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private sessionStorageService: SessionStorageService,
    private userService: UsersService,
    private router: Router
  ) { }

  /**
   * Lifecycle hook called on component initialization
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventType = params.get('eventType') as 'future' | 'past';
      this.loadUserAndEvents();
    });
  }

  /**
   * Load the current user and their events based on the event type
   */
  loadUserAndEvents(): void {
    const userId = this.sessionStorageService.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user: User) => {
          this.user = user;
          this.getEvents();
        },
        error => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }

  /**
   * Fetch events based on the event type
   */
  getEvents(): void {
    if (this.eventType === 'future') {
      this.eventService.getFutureEvents().subscribe(
        events => {
          this.events = events;
        },
        error => console.error("Erreur lors de la récupération des événements futurs :", error)
      );
    } else {
      this.eventService.getPastEventsByUserId(this.user.id).subscribe(
        events => {
          console.log(events)
          this.events = events;
        },
        error => console.error("Erreur lors de la récupération des événements passés :", error)
      );
    }
  }

  /**
   * Update the list of events displayed
   * @param {Event[]} events - The new list of events to display
   */
  updateEvents(events: Event[]): void {
    this.events = events;
  }

  /**
   * Redirect to the create event page
   */
  redirectToCreateEvent(): void {
    this.router.navigate(['/create-event']);
  }
}
