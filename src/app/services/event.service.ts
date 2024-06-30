import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Event } from "../data/event";
import { SwalService } from './swal.service';

/**
 * Service to handle CRUD operations for events.
 * Extends BaseService to handle common error handling.
 */
@Injectable()
export class EventService extends BaseService {

  /** URL for events API endpoint */
  private eventsUrl = `${this.environmentUrl}events`;

  constructor(private http: HttpClient, swalService: SwalService) {
    super(swalService); // Calls the constructor of BaseService with SwalService injection
  }

  /**
   * Fetches all events.
   * @returns An Observable array of Event objects
   */
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl).pipe(
      catchError(this.handleError<any>('getEvents'))
    );
  }

  /**
   * Fetches an event by its ID.
   * @param eventId The ID of the event to fetch
   * @returns An Observable of Event
   */
  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.eventsUrl}/${eventId}`).pipe(
      catchError(this.handleError<any>('getEvents'))
    );
  }

  /**
   * Fetches future events.
   * @returns An Observable array of future Event objects
   */
  getFutureEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/filter?type=future`).pipe(
      catchError(this.handleError<any>('getFutureEvents'))
    );
  }

  /**
   * Fetches past events by user ID.
   * @param userId The ID of the user whose past events to fetch
   * @returns An Observable array of past Event objects
   */
  getPastEventsByUserId(userId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/filter?type=past&userId=${userId}`).pipe(
      catchError(this.handleError<any>('getPastEventsByUserId'))
    );
  }

  /**
   * Creates an event.
   * @param eventDTO The event data to create
   * @param file The file associated with the event (e.g., image)
   * @returns An Observable<any> for the HTTP POST request
   */
  createEvent(eventDTO: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('eventDTO', new Blob([JSON.stringify(eventDTO)], { type: 'application/json' }));

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(this.eventsUrl, formData, { headers }).pipe(
      catchError(this.handleError<any>('createEvent'))
    );
  }

  /**
   * Searches events with optional filter parameters.
   * @param params Object containing filter parameters: title, location, date, categoryId, createdById
   * @returns An Observable array of Event objects matching the search criteria
   */
  searchEvents(params: { title?: string, location?: string, date?: string, categoryId?: string, createdById?: string }): Observable<Event[]> {
    let url = `${this.eventsUrl}/search`;
    let queryParams = new HttpParams();
    if (params.title) {
      queryParams = queryParams.set('title', params.title);
    }
    if (params.location) {
      queryParams = queryParams.set('location', params.location);
    }
    if (params.date) {
      queryParams = queryParams.set('date', params.date);
    }
    if (params.categoryId) {
      queryParams = queryParams.set('categoryId', params.categoryId);
    }
    if (params.createdById) {
      queryParams = queryParams.set('createdById', params.createdById);
    }
    url += '?' + queryParams.toString();

    return this.http.get<Event[]>(url).pipe(
      catchError(this.handleError<any>('searchEvents'))
    );
  }

  /**
   * Deletes an event by its ID.
   * @param eventId The ID of the event to delete
   * @returns An Observable<void> for the HTTP DELETE request
   */
  deleteEvent(eventId: string): Observable<void> {
    const url = `${this.eventsUrl}/${eventId}`;
    return this.http.delete<void>(url);
  }
}
