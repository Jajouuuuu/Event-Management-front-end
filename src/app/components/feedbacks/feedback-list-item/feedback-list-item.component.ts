import { Component, Input } from '@angular/core';
import { Feedback } from '../../../data/feedback';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-feedback-list-item',
  templateUrl: './feedback-list-item.component.html',
  styleUrls: ['./feedback-list-item.component.css']
})
export class FeedbackListItemComponent {

  @Input() feedback!: Feedback;

  constructor() { }

}
