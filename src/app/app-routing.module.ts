import { NgModule } from '@angular/core';
import { SigninComponent } from './components/sign-in/sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FuturEventListComponent } from './components/events/future-event-list/event-list.component';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { RegistrationListComponent } from './components/registration/registration-list/registration-list.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { CreateFeedbackComponent } from './components/feedbacks/create-feedback/create-feedback.component';
import { PastEventListComponent } from './components/events/past-event-list/past-event-list.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';


const routes: Routes = [
  {path: 'sign-in', component: SigninComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'event-list', component: FuturEventListComponent },
  {path: 'event-details/:eventId', component: EventDetailsComponent },
  {path: 'registrations', component: RegistrationListComponent },
  {path: 'create-event', component: CreateEventComponent},
  {path: 'feedbacks/create', component: CreateFeedbackComponent},
  {path: 'past-event-list', component: PastEventListComponent},
  { path: 'profile', component: ProfilePageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
