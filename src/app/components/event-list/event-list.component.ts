import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event as EventItem } from "../../data/event";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: EventItem[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
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
