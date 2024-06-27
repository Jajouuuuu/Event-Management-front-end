import { Component, OnInit } from '@angular/core';
import { Registration } from '../../../data/registration';
import { RegistrationService } from '../../../services/registration.service';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {
  registrations: Registration[] = [];

  constructor(
    private registrationService: RegistrationService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    const userId = this.sessionStorageService.getItem('userId');
    if (userId) {
      this.registrationService.getRegistrationsByUserId(userId).subscribe(
        (registrations: Registration[]) => {
          this.registrations = registrations;
        },
        error => {
          console.error('Error fetching registrations:', error);
        }
      );
    }
  }

  handleUnregisterSuccess(registrationId: string): void {
    this.registrations = this.registrations.filter(reg => reg.registrationId !== registrationId);
  }
}
