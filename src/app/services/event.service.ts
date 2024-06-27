import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { BaseService } from './base.service';
import { Event } from "../data/event";

@Injectable()
export class EventService extends BaseService {

  private eventsUrl = `${this.environmentUrl}events`;

  constructor(private http: HttpClient) {
    super();
  }

  protected override handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Event not found',
          text: 'The event you are looking for does not exist.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
      }
      return super.handleError(operation, result)(error);
    };
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl).pipe(
      catchError(this.handleError<any>('getEvents'))
    );
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.eventsUrl}/event/${eventId}`).pipe(
      catchError(this.handleError<any>('getEvents'))
    );
  }

  createEvent(eventDTO: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('eventDTO', new Blob([JSON.stringify(eventDTO)], { type: 'application/json' }));

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(this.eventsUrl, formData, { headers }).pipe(
      catchError(this.handleError<any>('getEvents'))
    );
  }

  searchEvents(title: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/title/${title}`).pipe(
      catchError(this.handleError<any>('getEvents'))
    );
  }

  searchEventsByDate(date: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/date/${date}`).pipe(
      catchError(this.handleError<any>('getEvents'))
    );
  }

  searchEventsByCategory(categoryId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/category/${categoryId}`).pipe(
      catchError(this.handleError<any>('getEvents'))
    );
  }

  getFutureEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/future`).pipe(
      catchError(this.handleError<any>('getEvents'))
    );
  }

  getPastEventsByUserId(userId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/past/${userId}`).pipe(
      catchError(this.handleError<any>('getEvents'))
    );
  }

  getEventsCreatedByUser(userId: string): Observable<Event[]> {
    const url = `${this.eventsUrl}/createdBy/${userId}`;
    return this.http.get<Event[]>(url);
  }

  deleteEvent(eventId: string): Observable<void> {
    const url = `${this.eventsUrl}/${eventId}`;
    return this.http.delete<void>(url);
  }
}
