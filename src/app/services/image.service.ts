import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../data/image';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseService{

    private usersUrl = `${this.environmentUrl}images`;
  
    constructor(private http: HttpClient) { super();}

  getImageById(id: string): Observable<Blob> {
    return this.http.get(`${this.environmentUrl}images/${id}`, {responseType : 'blob'});
  }
}
