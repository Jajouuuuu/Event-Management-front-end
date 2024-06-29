import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../data/category';
import { SwalService } from '../../../services/swal.service';

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
    private categoryService: CategoryService,
    private swalService: SwalService
  ) {
    this.createEventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.maxLength(2500), Validators.minLength(100)]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
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
    const dateTime = new Date(formValues.date + 'T' + formValues.time).toISOString();
    const eventDTO = {
      title: formValues.title,
      description: formValues.description,
      dateTime: dateTime,
      location: formValues.location,
      categoryId: formValues.category,
      createdById: userId,
      createdAt: createdAt
    };

    if (this.selectedFile) {
      this.eventService.createEvent(eventDTO, this.selectedFile).subscribe(
        response => {
          console.log('Event created successfully', response);
          this.swalService.alert('Success', 'Event created successfully!', 'success').then(() => {
            window.location.href = 'http://localhost:4200/events/future';
          });
        },
        error => {
          console.error('Error creating event', error);
          const errorMessage = error?.error?.message || 'An error occurred, please try again.';
          this.swalService.alert('Error', errorMessage, 'error');
        }
      );
    } else {
      this.swalService.alert('Error', 'File is required', 'error');
    }
  }
}
