import { Component, OnInit } from '@angular/core';
import { User } from '../../../data/users';
import { Event } from '../../../data/event';
import { EventService } from '../../../services/event.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-past-event-list',
  templateUrl: './past-event-list.component.html',
  styleUrl: './past-event-list.component.css'
})
export class PastEventListComponent implements OnInit {
    events: Event[] = [];
    user!: User;
  
    constructor(
      private eventService: EventService,  
      private sessionStorageService: SessionStorageService, 
      private userService: UsersService
    ) { }
  
    ngOnInit(): void {
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
      console.log("Avant l'appel au service");
      this.eventService.getPastEventsByUserId(this.user.id).subscribe(
        events => {
          console.log("Evénements récupérés :", events);
          this.events = events;
        },
        error => console.error("Erreur lors de la récupération des événements :", error)
      );
      console.log("Après l'appel au service");
    }
  }
  
