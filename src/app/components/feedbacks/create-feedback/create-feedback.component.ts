import { Component } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.services';
import { SessionStorageService } from '../../../services/session-storage.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent {
  eventId: string = '';
  rating: number = 0;
  comment: string = '';

  constructor(
    private feedbackService: FeedbackService,
    private sessionStorageService: SessionStorageService,
    private route: ActivatedRoute
  ) { }

  onSubmit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;
    console.log(this.eventId);
    const userId = this.sessionStorageService.getItem('userId');
    const feedbackDTO = {
      eventId: this.eventId,
      userId: userId,
      rating: this.rating,
      comment: this.comment
    };

    console.log('FeedbackDTO à envoyer:', feedbackDTO); 

    this.feedbackService.addFeedback(feedbackDTO).subscribe(
      response => {
        console.log('Feedback ajouté avec succès', response); 
        this.resetForm();
        Swal.fire({
          icon: 'success',
          title: 'Feedback ajouté avec succès!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.history.back();
        });
      },
      error => {
        console.error('Erreur lors de l\'ajout du feedback', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de l\'ajout du feedback',
          text: error.message ? error.message : 'Une erreur est survenue lors de l\'ajout du feedback.'
        });
      }
    );
  }

  resetForm(): void {
    this.rating = 0;
    this.comment = '';
  }

  ratingValid(): boolean {
    return this.rating !== null && !isNaN(this.rating);
  }

  commentValid(): boolean {
    return (this.comment.length >= 10) && (this.comment.length <= 500);
  }
}
