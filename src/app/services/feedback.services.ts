import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Feedback } from '../data/feedback';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService {

  private feedbackUrl = `${this.environmentUrl}feedbacks`;

  constructor(private http: HttpClient) {
    super()
  }

  getFeedbacksForUser(userId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.feedbackUrl}/user/${userId}`);
  }

  getFeedbacksForEvent(eventId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.feedbackUrl}/event/${eventId}`);
  }

  addFeedback(feedbackDTO: any): Observable<any> {
    return this.http.post<any>(this.feedbackUrl, feedbackDTO);
  }

}
