import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Event } from "../data/event";


@Injectable()
export class EventService extends BaseService {

  private eventsUrl = `${this.environmentUrl}events`;;

   constructor(private http: HttpClient) {
        super();
    }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.environmentUrl}events/${eventId}/event`);
  }
}
