import { Component, Input } from '@angular/core';
import { User } from '../../../data/users';

@Component({
  selector: 'app-past-events-header',
  template: `
    <hr class="w-25 mx-auto border-black">
    <h2 class="title">Your past event's</h2>
    <hr class="w-25 mx-auto border-black">
    <p *ngIf="user" class="lead">{{ user.username }}, would you like to review some of the events you attended?</p>
    <p class="lead">Explore past events and discover feedback from other users.</p>
    <p class="lead">You can read shared experiences and leave your own feedback to contribute to our community.</p>
    <p class="lead">Join us in shaping memorable experiences together!</p>
  `
})
export class PastEventsHeaderComponent {
  /**
   * The user object containing user details
   * @type {User}
   */
  @Input() user!: User; 
}
