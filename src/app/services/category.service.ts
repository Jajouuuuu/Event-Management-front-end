import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../data/category';
import { BaseService } from './base.service';
import { SwalService } from './swal.service';

/**
 * Service to fetch categories from the API.
 * Extends BaseService to handle common error handling.
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  /** URL for categories API endpoint */
  private categoriesUrl = `${this.environmentUrl}categories`;

  constructor(private http: HttpClient, swalService: SwalService) {
    super(swalService); // Calling constructor of BaseService with SwalService injection
  }

  /**
   * Fetches all categories from the API.
   * @returns An Observable array of Category objects
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }
}
