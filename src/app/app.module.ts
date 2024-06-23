import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { EventListItemComponent } from './components/events/event-list-item/event-list-item.component';
import { EventService } from './services/event.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { RegistrationListComponent } from './components/registration/registration-list/registration-list.component';
import { RegistrationItemComponent } from './components/registration/registration-item/registration-item.component';
import { FeedbackListComponent } from './components/feedbacks/feedback-list/feedback-list.component';
import { FeedbackListItemComponent } from './components/feedbacks/feedback-list-item/feedback-list-item.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { CategoryService } from './services/category.service';
import { ImageService } from './services/image.service';
import { RegistrationService } from './services/registration.service';
import { BaseService } from './services/base.service';
import { CreateFeedbackComponent } from './components/feedbacks/create-feedback/create-feedback.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent, 
    SigninComponent, 
    SignUpComponent, 
    EventListComponent, 
    EventListItemComponent, 
    EventDetailsComponent,
    TopBarComponent, 
    EventDetailsComponent, 
    RegistrationListComponent,
    RegistrationItemComponent,
    FeedbackListComponent,
    FeedbackListItemComponent,
    CreateEventComponent,
    CreateFeedbackComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
    HttpClientModule,
    RouterModule,
    MatIconModule
  ],
  providers: [
    UsersService,
    EventService,
    CategoryService,
    ImageService, 
    RegistrationService, 
    BaseService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
