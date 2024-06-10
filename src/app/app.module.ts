import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventListItemComponent } from './components/event-list-item/event-list-item.component';
import { EventService } from './services/event.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent, 
    SigninComponent, 
    SignUpComponent, 
    EventListComponent, 
    EventListItemComponent, 
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, 
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    UsersService,
    EventService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
