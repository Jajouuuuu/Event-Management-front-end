import { Component, Input, OnInit } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.services';
import { Feedback } from '../../../data/feedback';
import { Router } from '@angular/router';

@Component({
    selector: 'app-feedback-list',
    templateUrl: './feedback-list.component.html',
    styleUrls: ['./feedback-list.component.css']
})
export class FeedbackComponent implements OnInit {
    @Input() eventId?: string; 
    feedbacks: Feedback[] = [];

    constructor(private feedbackService: FeedbackService, private router: Router) { }

    ngOnInit(): void {
        if (this.eventId) {
            this.feedbackService.getFeedbacksForEvent(this.eventId).subscribe(
                feedbacks => this.feedbacks = feedbacks,
                error => console.error('Error loading feedbacks', error)
            );
        } else {
            console.error('Event ID is not available');
        }
    }

    navigateToCreateFeedback(): void {
        this.router.navigate(['/feedbacks/create']);
    }
}
