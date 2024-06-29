import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Event } from "../data/event";
import { SwalService } from './swal.service';

@Injectable()
export class EventService extends BaseService {

  private eventsUrl = `${this.environmentUrl}events`;

  constructor(private http: HttpClient, swalService: SwalService) {
    super(swalService); // Appel du constructeur de BaseService avec SwalService
  }

  // Récupérer tous les événements
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl).pipe(
      catchError(this.handleError<any>('getEvents'))
    );
  }

  // Récupérer un événement par son ID
  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.eventsUrl}/${eventId}`).pipe(
      catchError(this.handleError<any>('getEvents'))
    );
  }

  // Récupérer les événements futurs
  getFutureEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/filter?type=future`).pipe(
      catchError(this.handleError<any>('getFutureEvents'))
    );
  }

  // Récupérer les événements passés par ID utilisateur
  getPastEventsByUserId(userId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.eventsUrl}/filter?type=past&userId=${userId}`).pipe(
      catchError(this.handleError<any>('getPastEventsByUserId'))
    );
  }

  // Créer un événement
  createEvent(eventDTO: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('eventDTO', new Blob([JSON.stringify(eventDTO)], { type: 'application/json' })); // Ajout des données JSON à FormData

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(this.eventsUrl, formData, { headers }).pipe(
      catchError(this.handleError<any>('createEvent'))
    );
  }
  
  // Rechercher des événements avec des paramètres de filtre (titre, lieu, date, catégorie, créateur)
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

  // Supprimer un événement par son ID
  deleteEvent(eventId: string): Observable<void> {
    const url = `${this.eventsUrl}/${eventId}`;
    return this.http.delete<void>(url);
  }
}
