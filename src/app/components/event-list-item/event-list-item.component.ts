import { Component, Input } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from "../../data/event";
import { Image } from '../../data/image';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrl: './event-list-item.component.css'
})
export class EventListItemComponent {
  @Input() 
  event!: Event;
  imageUrl: string = ''; // Initialisation de la variable imageUrl

  constructor(private eventService: EventService, private imageService: ImageService) { }

  ngOnInit(): void {
    if (this.event && this.event.image) {
      this.getImageUrl(this.event.image.id);
    }
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
}
