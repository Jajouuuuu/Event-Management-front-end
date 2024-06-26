import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EventListItemComponent } from './components/events/event-list-item/event-list-item.component';
import { EventService } from './services/event.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { RegistrationListComponent } from './components/registration/registration-list/registration-list.component';
import { RegistrationItemComponent } from './components/registration/registration-item/registration-item.component';
import { FeedbackComponent } from './components/feedbacks/feedback-list/feedback-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { CategoryService } from './services/category.service';
import { ImageService } from './services/image.service';
import { RegistrationService } from './services/registration.service';
import { BaseService } from './services/base.service';
import { CreateFeedbackComponent } from './components/feedbacks/create-feedback/create-feedback.component';
import { MatIconModule } from '@angular/material/icon';
import { RegisterEventComponent } from './components/registration/register-event/register-event.component';
import { ProfilePageComponent } from './components/profile/profile-page/profile-page.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { FutureEventsHeaderComponent } from './components/events/futur-event-header/futur-event-header.component';
import { PastEventsHeaderComponent } from './components/events/past-event-header/past-event-header.component';
import { SearchBarComponent } from './components/events/search-bar/search-bar.component';
import { OsmMapComponent } from './components/osm-map/osm-map.component';
import { UserInfoComponent } from './components/profile/user-info/user-info.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlobToImageDirective } from './services/blob-to-image.directive';
import { ForgotPasswordComponent } from './components/users/forgot-password/forgot-password.component';
import { SigninComponent } from './components/users/sign-in/sign-in.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignUpComponent,
    EventListItemComponent,
    EventDetailsComponent,
    TopBarComponent,
    EventDetailsComponent,
    RegistrationListComponent,
    RegistrationItemComponent,
    FeedbackComponent,
    CreateEventComponent,
    CreateFeedbackComponent,
    RegisterEventComponent,
    ProfilePageComponent,
    EventListComponent,
    FutureEventsHeaderComponent,
    PastEventsHeaderComponent,
    SearchBarComponent,
    OsmMapComponent,
    UserInfoComponent,
    FooterComponent,
    BlobToImageDirective,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    MatIconModule,
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
