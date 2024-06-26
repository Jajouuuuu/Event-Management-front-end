import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../data/category';
import Swal from 'sweetalert2';

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

  constructor(private eventService: EventService, private categoryService: CategoryService) { }

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

  onSearch(): void {
    if (this.searchTitle) {
      this.eventService.searchEvents(this.searchTitle).subscribe(
        events => {
          this.handleSearchResults(events);
        },
        error => {
          if (error.status === 404) {
            this.showNoResultsAlert();
          } else {
            console.error('Error searching events:', error);
          }
        }
      );
    } else if (this.searchDate) {
      this.eventService.searchEventsByDate(this.searchDate).subscribe(
        events => {
          this.handleSearchResults(events);
        },
        error => {
          if (error.status === 404) {
            this.showNoResultsAlert();
          } else {
            console.error('Error searching events:', error);
          }
        }
      );
    } else if (this.selectedCategory) {
      this.eventService.searchEventsByCategory(this.selectedCategory).subscribe(
        events => {
          this.handleSearchResults(events);
        },
        error => {
          if (error.status === 404) {
            this.showNoResultsAlert();
          } else {
            console.error('Error searching events:', error);
          }
        }
      );
    }
  }

  handleSearchResults(events: any[]): void {
    this.searchResults.emit(events);
    if (events.length === 0) {
      this.showNoResultsAlert();
    }
  }

  showNoResultsAlert(): void {
    Swal.fire({
      icon: 'info',
      title: 'No results found',
      text: 'No events match your search criteria.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }
}
