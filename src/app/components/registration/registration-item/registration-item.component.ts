import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RegistrationService } from '../../../services/registration.service';
import { SessionStorageService } from '../../../services/session-storage.service';

/**
 * Component for displaying a single registration item.
 */
@Component({
  selector: 'registration-item',
  templateUrl: './registration-item.component.html',
  styleUrls: ['./registration-item.component.css']
})
export class RegistrationItemComponent {
  /** Registration object to display */
  @Input() registration: any;

  /** Event emitter for successful unregistering */
  @Output() unregisterSuccess = new EventEmitter<string>();

  constructor(
    private registrationService: RegistrationService,
    private sessionStorageService: SessionStorageService
  ) { }

  /**
   * Unregisters the current user from the event associated with the given registration ID.
   * Emits an event upon successful unregistering.
   * 
   * @param {string} registrationId - The ID of the registration to be unregistered
   */
  unregisterFromEvent(registrationId: string): void {
    const userId = this.sessionStorageService.getItem('userId') || '';
    this.registrationService.deleteRegistration(registrationId, userId).subscribe(
      () => {
        this.unregisterSuccess.emit(registrationId);
      },
      error => {
        console.error('Error unregistering from event:', error);
      }
    );
  }
}
