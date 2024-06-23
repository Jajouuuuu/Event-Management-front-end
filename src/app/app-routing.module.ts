import { NgModule } from '@angular/core';
import { SigninComponent } from './components/sign-in/sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { RegistrationListComponent } from './components/registration/registration-list/registration-list.component';
import { FeedbackListComponent } from './components/feedbacks/feedback-list/feedback-list.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { CreateFeedbackComponent } from './components/feedbacks/create-feedback/create-feedback.component';


const routes: Routes = [
  {path: 'sign-in', component: SigninComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'event-list', component: EventListComponent },
  {path: 'event-details/:eventId', component: EventDetailsComponent },
  {path: 'registrations', component: RegistrationListComponent },
  {path: 'feedback', component: FeedbackListComponent},
  {path: 'create-event', component: CreateEventComponent},
  {path: 'feedbacks/create', component: CreateFeedbackComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
