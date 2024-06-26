import { Component, Input } from '@angular/core';
import { User } from '../../../data/users';

@Component({
  selector: 'app-future-events-header',
  template: `
    <hr class="w-25 mx-auto border-black">
    <h2 class="title">Discover Upcoming Events</h2>
    <hr class="w-25 mx-auto border-black">
    <p *ngIf="user" class="lead">Welcome on Event's Core, {{ user.username }}!</p>
    <p class="lead">You can explore and register for upcoming events. </p>
    <p class="lead">Whether you're looking to learn, connect, or simply have fun !</p>
    <p class="lead">Browse our curated list of events and secure your spot today. Join us in shaping memorable experiences together.</p>
  `
})
export class FutureEventsHeaderComponent {
  @Input() user!: User;
}
