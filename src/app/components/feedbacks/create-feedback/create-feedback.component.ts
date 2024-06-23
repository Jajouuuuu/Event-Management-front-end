import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from '../../../data/feedback';
import { FeedbackService } from '../../../services/feedback.services';

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent {

  feedback: Feedback = {
    feedbackId: '',
    event: {
      id: '', title: '', date: '',
      description: '',
      time: '',
      location: '',
      category: {
        id: '',
        name: ''
      },
      createdBy: {
        id: '',
        username: '',
        email: '',
        password: '',
        createdAt: new Date(),
      },
      createdAt: new Date(),
      image: null
    },
    user: {
      id: '', username: '', email: '',
      password: '',
      createdAt: ''
    },
    rating: 0,
    comment: '',
    createdAt: new Date()
  };

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  submitFeedback() {
    this.feedbackService.addFeedback(this.feedback).subscribe(
      newFeedback => {
        console.log('Feedback ajouté avec succès', newFeedback);
        // Réinitialiser le formulaire ou faire d'autres actions après l'ajout
        this.router.navigate(['/feedbacks']); // Rediriger vers la liste des feedbacks après ajout
      },
      error => console.error('Erreur lors de l\'ajout du feedback', error)
    );
  }
}
