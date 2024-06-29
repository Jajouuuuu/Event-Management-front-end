import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../data/event';
import { ImageService } from '../../../services/image.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { EventService } from '../../../services/event.service';
import { Router } from '@angular/router';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.css']
})
export class EventListItemComponent implements OnInit {
  @Input() event!: Event;
  imageUrl: string = '';
  isCurrentUserEventOwner: boolean = false;

  constructor(
    private imageService: ImageService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private eventService: EventService,
    private swalService: SwalService,
  ) { }

  ngOnInit(): void {
    if (this.event && this.event.image) {
      this.fetchImage(this.event.image.url);
    }
    this.checkCurrentUserEventOwner();
  }

  isProfilePage(): boolean {
    return this.router.url === '/profile';
  }

  checkCurrentUserEventOwner(): void {
    const currentUserId = this.sessionStorageService.getItem('userId');
    this.isCurrentUserEventOwner = this.event.createdBy.id === currentUserId;
  }

  fetchImage(fileName: string): void {
    this.imageService.getFile(fileName).subscribe(
      (blob: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(blob);
      },
      error => {
        console.error('Failed to fetch image:', error);
      }
    );
  }

  deleteEvent(): void {
    this.swalService.confirm('Confirmation', 'Are you sure you want to delete this event?').then((result) => {
      if (result) {
        this.eventService.deleteEvent(this.event.id).subscribe(
          () => {
            this.swalService.alert('Success', 'Event deleted successfully!', 'success').then(() => {
              // Rediriger vers la page /profile après la suppression
              this.router.navigateByUrl('/profile');
            });
          },
          error => {
            console.error('Error deleting event:', error);
            this.swalService.alert('Error', 'Failed to delete event.', 'error');
          }
        );
      } else {
        // L'utilisateur a cliqué sur "No" dans la boîte de dialogue de confirmation
        console.log('Deletion cancelled');
      }
    });
  }
}
