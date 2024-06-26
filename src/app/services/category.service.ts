import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../data/category';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  private categoriesUrl = `${this.environmentUrl}categories`;

  constructor(private http: HttpClient) {
    super();
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }
}
