import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../data/category';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  createEventForm: FormGroup;
  categories: Category[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private sessionStorageService: SessionStorageService,
    private categoryService: CategoryService
  ) {
    this.createEventForm = this.fb.group({
      title: [''],
      description: [''],
      date: [''],
      time: [''],
      location: [''],
      category: [''],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    const userId = this.sessionStorageService.getItem('userId');
    const createdAt = new Date().toISOString();
    const formValues = this.createEventForm.value;
    const eventDTO = {
      title: formValues.title,
      description: formValues.description,
      date: formValues.date,
      time: formValues.time,
      location: formValues.location,
      categoryId: formValues.category,
      createdById: userId,
      createdAt: createdAt
    };

    console.log('Event DTO:', eventDTO);

    if (this.selectedFile) {
      console.log('Selected file:', this.selectedFile);

      this.eventService.createEvent(eventDTO, this.selectedFile).subscribe(response => {
        console.log('Event created successfully', response);
      }, error => {
        console.error('Error creating event', error);
      });
    } else {
      console.error('File is required');
    }
  }
}
