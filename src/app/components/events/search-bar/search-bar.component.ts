import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../data/category';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  /**
   * The title to search for
   * @type {string}
   */
  searchTitle: string = '';

  /**
   * The date to search for
   * @type {string}
   */
  searchDate: string = '';

  /**
   * The selected category ID to search for
   * @type {string}
   */
  selectedCategory: string = '';

  /**
   * The list of available categories
   * @type {Category[]}
   */
  categories: Category[] = [];

  /**
   * Emits the search results to parent component
   * @type {EventEmitter<any[]>}
   */
  @Output() searchResults = new EventEmitter<any[]>();

  constructor(
    private eventService: EventService, 
    private categoryService: CategoryService,
    private swalService: SwalService
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized
   */
  ngOnInit(): void {
    this.loadCategories();
  }

  /**
   * Loads the categories from the service
   */
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }

  /**
   * Performs search based on entered criteria
   * @param {Event} [event] - The event triggered by form submission
   */
  onSearch(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const searchParams: any = {};
    if (this.searchTitle) {
      searchParams.title = this.searchTitle;
    }
    if (this.searchDate) {
      if (this.searchDate.length === 10) {
        searchParams.date = this.searchDate;
      } else {
        this.swalService.alert('Warning', 'Please enter a complete date.', 'warning');
        return;
      }
    }
    if (this.selectedCategory) {
      searchParams.categoryId = this.selectedCategory;
    }
    if (Object.keys(searchParams).length > 0) {
      this.eventService.searchEvents(searchParams).subscribe(
        events => {
          this.handleSearchResults(events);
        },
        error => {
          if (error.status === 404) {
            this.swalService.showNoResultsAlert();
          } else {
            console.error('Error searching events:', error);
          }
        }
      );
    } else {
      this.swalService.alert('Warning', 'Please enter search criteria.', 'warning');
    }
  }

  /**
   * Handles the search results and emits them to the parent component
   * @param {any[]} events - The search results
   */
  handleSearchResults(events: any[]): void {
    this.searchResults.emit(events);
    if (events.length === 0) {
      this.swalService.showNoResultsAlert();
    }
  }

  /**
   * Resets all the search filters and reloads the page
   */
  resetFilters(): void {
    this.searchTitle = '';
    this.searchDate = '';
    this.selectedCategory = '';
    window.location.reload();
  }
}
