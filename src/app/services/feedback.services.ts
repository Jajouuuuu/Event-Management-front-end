import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Feedback } from '../data/feedback';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService {

    private eventsUrl = `${this.environmentUrl}feedbacks`;

  constructor(private http: HttpClient) {
    super()
  }

  getFeedbacksForUser(userId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.eventsUrl}/user/${userId}`);
  }

  getFeedbacksForEvent(eventId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.eventsUrl}/event/${eventId}`);
  }

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.eventsUrl}`, feedback);
  }
}
