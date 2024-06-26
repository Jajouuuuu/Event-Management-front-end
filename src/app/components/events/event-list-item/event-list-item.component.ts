import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../data/event';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.css']
})
export class EventListItemComponent implements OnInit {
  @Input() event!: Event;
  imageUrl: string = '';

  constructor(private imageService: ImageService) { }

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
