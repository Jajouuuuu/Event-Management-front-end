import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Event } from "../data/event";


@Injectable()
export class EventService extends BaseService {

  private eventsUrl = `${this.environmentUrl}events`;

   constructor(private http: HttpClient) {
        super();
    }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.environmentUrl}events/${eventId}/event`);
  }

  createEvent(eventDTO: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('eventDTO', new Blob([JSON.stringify(eventDTO)], { type: 'application/json' }));

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(this.eventsUrl, formData, { headers });
  }
}
