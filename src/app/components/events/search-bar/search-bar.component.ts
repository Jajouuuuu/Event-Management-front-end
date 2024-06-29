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
  searchTitle: string = '';
  searchDate: string = '';
  selectedCategory: string = '';
  categories: Category[] = [];

  @Output() searchResults = new EventEmitter<any[]>();

  constructor(
    private eventService: EventService, 
    private categoryService: CategoryService,
    private swalService: SwalService // Injection du SwalService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

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

  onSearch(event?: Event): void {
    if (event) {
      event.preventDefault(); // Prevent default form submission
    }
    // Collect all search criteria
    const searchParams: any = {};
    if (this.searchTitle) {
      searchParams.title = this.searchTitle;
    }
    if (this.searchDate) {
      // Ensure the date is fully entered (e.g., "YYYY-MM-DD" format)
      if (this.searchDate.length === 10) {
        searchParams.date = this.searchDate;
      } else {
        // Show alert for incomplete date
        this.swalService.alert('Warning', 'Please enter a complete date.', 'warning');
        return;
      }
    }
    if (this.selectedCategory) {
      searchParams.categoryId = this.selectedCategory;
    }

    // Only perform search if there are criteria specified
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

  handleSearchResults(events: any[]): void {
    this.searchResults.emit(events);
    if (events.length === 0) {
      this.swalService.showNoResultsAlert();
    }
  }

  resetFilters(): void {
    this.searchTitle = '';
    this.searchDate = '';
    this.selectedCategory = '';
    // Recharger la page si nécessaire
    window.location.reload();
  }
  
}
