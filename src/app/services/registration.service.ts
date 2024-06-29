import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from '../data/registration';
import { BaseService } from './base.service';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseService {

  private registrationsUrl = `${this.environmentUrl}registrations`;

  constructor(private http: HttpClient, swalService: SwalService) {
    super(swalService); // Appel du constructeur de BaseService avec SwalService
  }

  getAllRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.registrationsUrl);
  }

  searchRegistrations(params: { userId?: string, eventId?: string }): Observable<Registration[]> {
    let url = `${this.registrationsUrl}/search`;
    let queryParams = new URLSearchParams();
    if (params.userId) {
      queryParams.set('userId', params.userId);
    }
    if (params.eventId) {
      queryParams.set('eventId', params.eventId);
    }
    url += '?' + queryParams.toString();

    return this.http.get<Registration[]>(url);
  }

  createRegistration(eventId: string, userId: string): Observable<Registration> {
    return this.http.post<Registration>(this.registrationsUrl, {eventId, userId});
  }

  deleteRegistration(registrationId: string, userId: string): Observable<void> {
    const url = `${this.registrationsUrl}/${registrationId}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'userId': userId
      })
    };
    return this.http.delete<void>(url, options);
  }
}
