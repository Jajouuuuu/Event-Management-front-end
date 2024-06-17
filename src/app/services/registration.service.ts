import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from '../data/registration';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseService {
  private registrationsUrl = `${this.environmentUrl}registrations`;

  constructor(private http: HttpClient) {
    super();
  }

  getRegistrationsByEventId(eventId: string): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.registrationsUrl}/event/${eventId}`);
  }

  registerForEvent(eventId: string, userId: string): Observable<any> {
    const url = `${this.registrationsUrl}`;
    const payload = { eventId, userId };
    return this.http.post(url, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  unregisterFromEvent(registrationId: string, userId: string): Observable<any> {
    const url = `${this.registrationsUrl}/${registrationId}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'userId': userId
      })
    };
    return this.http.delete(url, options);
  }
}
