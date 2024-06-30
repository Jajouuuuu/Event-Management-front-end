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
  /**
   * The event to be displayed in the list item
   * @type {Event}
   */
  @Input() event!: Event;

  /**
   * URL of the event image
   * @type {string}
   */
  imageUrl: string = '';

  /**
   * Flag to indicate if the current user is the owner of the event
   * @type {boolean}
   */
  isCurrentUserEventOwner: boolean = false;

  /**
   * Constructor for EventListItemComponent
   * @param {ImageService} imageService - Service for image-related operations
   * @param {Router} router - Service to navigate between routes
   * @param {SessionStorageService} sessionStorageService - Service for session storage operations
   * @param {EventService} eventService - Service for event-related operations
   * @param {SwalService} swalService - Service for SweetAlert notifications
   */
  constructor(
    private imageService: ImageService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private eventService: EventService,
    private swalService: SwalService,
  ) { }

  /**
   * Lifecycle hook called on component initialization
   */
  ngOnInit(): void {
    if (this.event && this.event.image) {
      this.fetchImage(this.event.image.url);
    }
    this.checkCurrentUserEventOwner();
  }

  /**
   * Check if the current route is the profile page
   * @returns {boolean} - True if the current route is '/profile'
   */
  isProfilePage(): boolean {
    return this.router.url === '/profile';
  }

  /**
   * Check if the current user is the owner of the event
   */
  checkCurrentUserEventOwner(): void {
    const currentUserId = this.sessionStorageService.getItem('userId');
    this.isCurrentUserEventOwner = this.event.createdBy.id === currentUserId;
  }

  /**
   * Fetch the image by file name and convert it to a data URL
   * @param {string} fileName - The name of the file to fetch
   */
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

  /**
   * Delete the event with a confirmation dialog
   */
  deleteEvent(): void {
    this.swalService.confirm('Confirmation', 'Are you sure you want to delete this event?').then((result) => {
      if (result) {
        this.eventService.deleteEvent(this.event.id).subscribe(
          () => {
            this.swalService.alert('Success', 'Event deleted successfully!', 'success').then(() => {
              this.router.navigateByUrl('/profile');
            });
          },
          error => {
            console.error('Error deleting event:', error);
            this.swalService.alert('Error', 'Failed to delete event.', 'error');
          }
        );
      } else {
        console.log('Deletion cancelled');
      }
    });
  }
}
