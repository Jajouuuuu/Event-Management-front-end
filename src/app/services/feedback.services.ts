import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Feedback } from '../data/feedback';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService {

  private feedbackUrl = `${this.environmentUrl}feedbacks`;

  constructor(private http: HttpClient, swalService: SwalService) {
    super(swalService); // Appel du constructeur de BaseService avec SwalService
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.feedbackUrl);
  }

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

  getFeedbackById(feedbackId: string): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.feedbackUrl}/${feedbackId}`);
  }

  deleteFeedback(feedbackId: string): Observable<void> {
    return this.http.delete<void>(`${this.feedbackUrl}/${feedbackId}`);
  }

  updateFeedback(feedbackId: string, feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.feedbackUrl}/${feedbackId}`, feedback);
  }

  addFeedback(feedbackDTO: any): Observable<Feedback> {
    return this.http.post<Feedback>(this.feedbackUrl, feedbackDTO);
  }

}
