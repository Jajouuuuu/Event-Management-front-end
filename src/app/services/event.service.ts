import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Event as EventItem } from "../data/event";


@Injectable()
export class EventService extends BaseService {

  private eventsUrl = `${this.environmentUrl}events`;;

   constructor(private http: HttpClient) {
        super();
    }

  getEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(this.eventsUrl);
  }
}
