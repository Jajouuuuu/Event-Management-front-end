import { NgModule } from '@angular/core';
import { SigninComponent } from './components/sign-in/sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

const routes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'event-list', component: EventListComponent },
  { path: 'event-details/:eventId', component: EventDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
