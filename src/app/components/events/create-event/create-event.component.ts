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
  /**
   * Form group for creating an event
   * @type {FormGroup}
   */
  createEventForm: FormGroup;

  /**
   * List of categories available for the event
   * @type {Category[]}
   */
  categories: Category[] = [];

  /**
   * The selected file to be uploaded with the event
   * @type {File | null}
   */
  selectedFile: File | null = null;

  /**
   * Constructor for CreateEventComponent
   * @param {FormBuilder} fb - Form builder service for reactive forms
   * @param {EventService} eventService - Service for event-related operations
   * @param {SessionStorageService} sessionStorageService - Service for session storage operations
   * @param {CategoryService} categoryService - Service for category-related operations
   * @param {SwalService} swalService - Service for displaying Swal alerts
   */
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

  /**
   * Lifecycle hook called on component initialization
   */
  ngOnInit(): void {
    this.loadCategories();
  }

  /**
   * Load the categories from the service
   */
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  /**
   * Handle the file input change event
   * @param {Event} event - The file input change event
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  /**
   * Handle form submission to create an event
   */
  onSubmit(): void {
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
