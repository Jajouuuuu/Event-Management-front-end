import { Component, Input } from '@angular/core';
import { SessionStorageService } from '../../../services/session-storage.service';
import { RegistrationService } from '../../../services/registration.service';

@Component({
  selector: 'registration-item',
  templateUrl: './registration-item.component.html',
  styleUrls: ['./registration-item.component.css']
})
export class RegistrationItemComponent {
  @Input() registration: any;
  isRegistered!: boolean;

  constructor(private sessionStorageService: SessionStorageService, private registrationService: RegistrationService) { }

  unregisterFromEvent(registrationId: string) {
    const userId = this.sessionStorageService.getItem('userId') || '';
    this.registrationService.unregisterFromEvent(registrationId, userId)
      .subscribe(() => {
        this.isRegistered = false;

      });
  }
}
