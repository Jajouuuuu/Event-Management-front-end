import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event as EventItem } from "../../../data/event";
import { SessionStorageService } from '../../../services/session-storage.service';
import { User } from '../../../data/users';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'] // Notez le 's' à styleUrls
})
export class FuturEventListComponent implements OnInit {
  events: EventItem[] = [];
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
          this.getEvents(); // Déplacez l'appel ici pour s'assurer que l'utilisateur est récupéré avant d'appeler getEvents
        },
        error => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }

  getEvents(): void {
    console.log("Avant l'appel au service");
    this.eventService.getFutureEvents().subscribe(
      events => {
        console.log("Evénements récupérés :", events);
        this.events = events;
      },
      error => console.error("Erreur lors de la récupération des événements :", error)
    );
    console.log("Après l'appel au service");
  }
}
