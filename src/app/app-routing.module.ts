import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { RegistrationListComponent } from './components/registration/registration-list/registration-list.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { CreateFeedbackComponent } from './components/feedbacks/create-feedback/create-feedback.component';
import { ProfilePageComponent } from './components/profile/profile-page/profile-page.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { SigninComponent } from './components/users/sign-in/sign-in.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/users/forgot-password/forgot-password.component';


const routes: Routes = [
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'events/:eventType', component: EventListComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'event-details/:eventId', component: EventDetailsComponent },
  { path: 'registrations', component: RegistrationListComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'feedbacks/create', component: CreateFeedbackComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
