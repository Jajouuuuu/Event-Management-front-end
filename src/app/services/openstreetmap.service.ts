// openstreetmap.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OpenStreetMapService {
    private nominatimBaseUrl = 'https://nominatim.openstreetmap.org/search';

    constructor(private http: HttpClient) { }

    geocode(address: string) {
        const url = `${this.nominatimBaseUrl}?q=${encodeURIComponent(address)}&format=json`;
        return this.http.get<any[]>(url);
    }
}
