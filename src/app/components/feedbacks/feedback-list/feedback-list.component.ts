import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.services';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Feedback } from '../../../data/feedback';
import { User } from '../../../data/users';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {

  feedbacks: Feedback[] = [];
  user!: User;

  constructor(private feedbackService: FeedbackService, private sessionStorageService: SessionStorageService, private router: Router) { }

  ngOnInit(): void {
    const userId = this.sessionStorageService.getItem('userId');
    if (userId) {
      this.feedbackService.getFeedbacksForUser(userId).subscribe(
        feedbacks => this.feedbacks = feedbacks,
        error => console.error('Erreur lors du chargement des feedbacks', error)
      );
    } else {
      console.error('User ID is not available in session storage');
    }
  }

  navigateToCreateFeedback(): void {
    this.router.navigate(['/feedbacks/create']);
  }

}
