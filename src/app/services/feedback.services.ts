import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Feedback } from '../data/feedback';
import { SwalService } from './swal.service';

/**
 * Service to handle CRUD operations for feedbacks.
 * Extends BaseService to handle common error handling.
 */
@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService {

  /** URL for feedbacks API endpoint */
  private feedbackUrl = `${this.environmentUrl}feedbacks`;

  constructor(private http: HttpClient, swalService: SwalService) {
    super(swalService);
  }

  /**
   * Fetches all feedbacks.
   * @returns An Observable array of Feedback objects
   */
  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.feedbackUrl);
  }

  /**
   * Searches feedbacks with optional filter parameters.
   * @param params Object containing filter parameters: userId, eventId, createdAt
   * @returns An Observable array of Feedback objects matching the search criteria
   */
  searchFeedbacks(params: { userId?: string, eventId?: string, createdAt?: string }): Observable<Feedback[]> {
    let url = `${this.feedbackUrl}/search`;
    let queryParams = new URLSearchParams();
    if (params.userId) {
      queryParams.set('userId', params.userId);
    }
    if (params.eventId) {
      queryParams.set('eventId', params.eventId);
    }
    if (params.createdAt) {
      queryParams.set('createdAt', params.createdAt);
    }
    url += '?' + queryParams.toString();

    return this.http.get<Feedback[]>(url);
  }

  /**
   * Fetches a feedback by its ID.
   * @param feedbackId The ID of the feedback to fetch
   * @returns An Observable of Feedback
   */
  getFeedbackById(feedbackId: string): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.feedbackUrl}/${feedbackId}`);
  }

  /**
   * Deletes a feedback by its ID.
   * @param feedbackId The ID of the feedback to delete
   * @returns An Observable<void> for the HTTP DELETE request
   */
  deleteFeedback(feedbackId: string): Observable<void> {
    return this.http.delete<void>(`${this.feedbackUrl}/${feedbackId}`);
  }

  /**
   * Updates a feedback by its ID.
   * @param feedbackId The ID of the feedback to update
   * @param feedback The updated Feedback object
   * @returns An Observable of the updated Feedback
   */
  updateFeedback(feedbackId: string, feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.feedbackUrl}/${feedbackId}`, feedback);
  }

  /**
   * Adds a new feedback.
   * @param feedbackDTO The feedback data to add
   * @returns An Observable of the newly added Feedback
   */
  addFeedback(feedbackDTO: any): Observable<Feedback> {
    return this.http.post<Feedback>(this.feedbackUrl, feedbackDTO);
  }

}
