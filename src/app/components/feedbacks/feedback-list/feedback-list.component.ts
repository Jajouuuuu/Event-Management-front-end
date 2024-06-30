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
    /**
     * ID of the event for which feedbacks are being displayed
     * @type {string}
     */
    @Input() eventId?: string;

    /**
     * List of feedbacks for the event
     * @type {Feedback[]}
     */
    feedbacks: Feedback[] = [];

    /**
     * Constructs the FeedbackComponent
     * @param {FeedbackService} feedbackService - Service to handle feedback related operations
     * @param {Router} router - Router for navigation
     */
    constructor(private feedbackService: FeedbackService, private router: Router) { }

    /**
     * Lifecycle hook that is called after data-bound properties are initialized
     */
    ngOnInit(): void {
        if (this.eventId) {
            this.feedbackService.searchFeedbacks({ eventId: this.eventId }).subscribe(
                feedbacks => this.feedbacks = feedbacks,
                error => console.error('Error loading feedbacks', error)
            );
        } else {
            console.error('Event ID is not available');
        }
    }

    /**
     * Navigates to the create feedback page
     */
    navigateToCreateFeedback(): void {
        this.router.navigate(['/feedbacks/create']);
    }
}
