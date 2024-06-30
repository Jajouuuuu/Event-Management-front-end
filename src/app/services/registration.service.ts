import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from '../data/registration';
import { BaseService } from './base.service';
import { SwalService } from './swal.service';

/**
 * Service to handle operations related to event registrations.
 * Extends BaseService for centralized error handling.
 */
@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends BaseService {

  /** URL for registration operations */
  private registrationsUrl = `${this.environmentUrl}registrations`;

  constructor(private http: HttpClient, swalService: SwalService) {
    super(swalService); 
  }

  /**
   * Retrieves all registrations.
   * @returns An Observable of type Registration[] containing all registrations
   */
  getAllRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.registrationsUrl);
  }

  /**
   * Searches registrations based on provided parameters.
   * @param params Object containing userId or eventId for filtering registrations
   * @returns An Observable of type Registration[] containing filtered registrations
   */
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

  /**
   * Creates a new registration for the specified event and user.
   * @param eventId The ID of the event to register for
   * @param userId The ID of the user registering for the event
   * @returns An Observable of type Registration representing the created registration
   */
  createRegistration(eventId: string, userId: string): Observable<Registration> {
    return this.http.post<Registration>(this.registrationsUrl, { eventId, userId });
  }

  /**
   * Deletes a registration by its ID and user ID.
   * @param registrationId The ID of the registration to delete
   * @param userId The ID of the user who owns the registration
   * @returns An Observable of type void indicating success or failure of deletion
   */
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
