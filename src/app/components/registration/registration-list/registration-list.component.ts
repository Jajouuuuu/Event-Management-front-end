import { Component, OnInit } from '@angular/core';
import { Registration } from '../../../data/registration';
import { RegistrationService } from '../../../services/registration.service';
import { SessionStorageService } from '../../../services/session-storage.service';

/**
 * Component for displaying a list of user registrations.
 */
@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {
  /** Array of user registrations */
  registrations: Registration[] = [];

  constructor(
    private registrationService: RegistrationService,
    private sessionStorageService: SessionStorageService
  ) { }

  /**
   * Initializes the component by fetching user registrations based on current user ID.
   */
  ngOnInit(): void {
    const userId = this.sessionStorageService.getItem('userId');
    if (userId) {
      this.registrationService.searchRegistrations({ userId: userId }).subscribe(
        (registrations: Registration[]) => {
          this.registrations = registrations;
        },
        error => {
          console.error('Error fetching registrations:', error);
        }
      );
    }
  }

  /**
   * Handles the successful unregistering of a registration item.
   * Removes the unregistered item from the local registrations array.
   * 
   * @param {string} registrationId - The ID of the registration to be unregistered
   */
  handleUnregisterSuccess(registrationId: string): void {
    this.registrations = this.registrations.filter(reg => reg.registrationId !== registrationId);
  }
}
