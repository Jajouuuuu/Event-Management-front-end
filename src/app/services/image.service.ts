import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseService {

  /** URL for fetching images */
  private apiUrl = 'https://plcicgnimviruexqcyqv.supabase.co/storage/v1/object/event-image/';
  /** API key for authorization */
  private API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsY2ljZ25pbXZpcnVleHFjeXF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzY3Njk0NSwiZXhwIjoyMDMzMjUyOTQ1fQ.0Ky1mKiGWtVEVSN74nYlNn-brt4kzRDter0z5BI0mjI';
  /** Bearer token for authorization */
  private BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsY2ljZ25pbXZpcnVleHFjeXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NzY5NDUsImV4cCI6MjAzMzI1Mjk0NX0.l5g47cDE5HK9Qp_p7Cd5EV9zeQdBlvCYMesV6thVFxw';

  constructor(private http: HttpClient, swalService: SwalService) {
    super(swalService);
  }

  /**
  * Fetches a file (image) by its filename.
  * @param fileName The name of the file (image) to fetch
  * @returns An Observable of Blob representing the file content
  */
  getFile(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.BEARER_TOKEN)
      .set('apikey', this.API_KEY);

    return this.http.get(this.apiUrl + fileName, {
      headers: headers,
      responseType: 'blob'
    });
  }
}
