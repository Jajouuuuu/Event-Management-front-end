import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../data/event';
import { ImageService } from '../../../services/image.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { EventService } from '../../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.css']
})
export class EventListItemComponent implements OnInit {
  @Input() event!: Event;
  imageUrl: string = '';
  isCurrentUserEventOwner: boolean = false;

  constructor(private imageService: ImageService, private router: Router,  private sessionStorageService: SessionStorageService, private eventService: EventService) { }

  ngOnInit(): void {
    if (this.event && this.event.image) {
      this.getImageUrl(this.event.image.id);
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

  getImageUrl(imageId: string): void {
    this.imageService.getImageById(imageId).subscribe(
      blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(blob);
      },
      error => {
        console.error('Erreur lors de la récupération de l\'image :', error);
      }
    );
  }

  deleteEvent(): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(this.event.id).subscribe(
        () => {
          alert('Event deleted successfully');
        },
        error => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }
}
