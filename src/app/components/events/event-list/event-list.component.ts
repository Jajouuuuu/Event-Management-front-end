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
  events: Event[] = [];
  user!: User;
  eventType: 'future' | 'past' = 'future';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private sessionStorageService: SessionStorageService,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventType = params.get('eventType') as 'future' | 'past';
      this.loadUserAndEvents();
    });
  }

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
          this.events = events;
        },
        error => console.error("Erreur lors de la récupération des événements passés :", error)
      );
    }
  }

  updateEvents(events: Event[]): void {
    this.events = events;
  }

  redirectToCreateEvent(): void {
    this.router.navigate(['/create-event']);
  }
}
