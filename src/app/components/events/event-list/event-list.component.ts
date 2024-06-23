import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event as EventItem } from "../../../data/event";
import { SessionStorageService } from '../../../services/session-storage.service';
import { User } from '../../../data/users';
import { UsersService } from '../../../services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: EventItem[] = [];
  user!: User;

  constructor(private eventService: EventService,  private sessionStorageService: SessionStorageService, private userService: UsersService) { }

  ngOnInit(): void {
    const userId = this.sessionStorageService.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user: User) => {
          this.user = user;
        },
        error => {
          console.error('Error fetching user:', error);
        }
      );
    }
    this.getEvents();
  }

  getEvents(): void {
    console.log("Avant l'appel au service");
    this.eventService.getEvents().subscribe(
      events => {
        console.log("Evénements récupérés :", events);
        this.events = events;
      },
      error => console.error("Erreur lors de la récupération des événements :", error)
    );
    console.log("Après l'appel au service");
  }
}
