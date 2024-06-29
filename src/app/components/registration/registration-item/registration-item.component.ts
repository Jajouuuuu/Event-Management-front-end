import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RegistrationService } from '../../../services/registration.service';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'registration-item',
  templateUrl: './registration-item.component.html',
  styleUrls: ['./registration-item.component.css']
})
export class RegistrationItemComponent {
  @Input() registration: any;
  @Output() unregisterSuccess = new EventEmitter<string>();

  constructor(
    private registrationService: RegistrationService,
    private sessionStorageService: SessionStorageService
  ) { }

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
