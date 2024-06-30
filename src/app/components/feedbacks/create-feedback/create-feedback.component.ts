import { Component } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.services';
import { SessionStorageService } from '../../../services/session-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent {
  /**
   * ID of the event for which feedback is being created
   * @type {string}
   */
  eventId: string = '';

  /**
   * Rating given by the user
   * @type {number}
   */
  rating: number = 0;

  /**
   * Comment provided by the user
   * @type {string}
   */
  comment: string = '';

  /**
   * Flag indicating whether the rating input has been touched
   * @type {boolean}
   */
  ratingTouched: boolean = false;

  /**
   * Flag indicating whether the comment input has been touched
   * @type {boolean}
   */
  commentTouched: boolean = false;

  constructor(
    private feedbackService: FeedbackService,
    private sessionStorageService: SessionStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private swalService: SwalService
  ) { }

  /**
   * Submits the feedback form
   */
  onSubmit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;
    const userId = this.sessionStorageService.getItem('userId');

    if (this.ratingValid() && this.commentValid()) {
      const feedbackDTO = {
        eventId: this.eventId,
        userId: userId,
        rating: this.rating,
        comment: this.comment
      };

      this.feedbackService.addFeedback(feedbackDTO).subscribe(
        response => {
          console.log('Feedback ajouté avec succès', response);
          this.resetForm();
          this.swalService.success('Feedback ajouté avec succès!', 'Bravo vous avez bien ajouté votre feedback !');
          setTimeout(() => {
            this.router.navigate(['/events/past']);
          }, 2000);
        },
        error => {
          console.error('Erreur lors de l\'ajout du feedback', error);
          this.swalService.error('Erreur lors de l\'ajout du feedback', error.message ? error.message : 'Une erreur est survenue lors de l\'ajout du feedback.');
        }
      );
    } else {
      this.swalService.error('Formulaire invalide', 'Veuillez vérifier les données saisies.');
    }
  }

  /**
   * Resets the feedback form
   */
  resetForm(): void {
    this.rating = 0;
    this.comment = '';
    this.ratingTouched = false;
    this.commentTouched = false;
  }

  /**
   * Validates the rating input
   * @returns {boolean} - Whether the rating is valid
   */
  ratingValid(): boolean {
    return this.rating !== null && !isNaN(this.rating) && this.rating >= 0 && this.rating <= 5;
  }

  /**
   * Validates the comment input
   * @returns {boolean} - Whether the comment is valid
   */
  commentValid(): boolean {
    return this.comment.length >= 5 && this.comment.length <= 500;
  }
}
